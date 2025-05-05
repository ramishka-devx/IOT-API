import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { CreateMachineDto, UpdateMachineDto } from './dto/machine.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  async create(createMachineDto: CreateMachineDto, userId: number): Promise<Machine> {
    const machine = this.machineRepository.create({
      ...createMachineDto,
      created_by: userId,
      updated_by: userId,
    });
    return this.machineRepository.save(machine);
  }

  async findAll(): Promise<Machine[]> {
    return this.machineRepository.find({
      relations: ['division', 'iotDevices'],
    });
  }

  async findByDivision(divisionId: number): Promise<Machine[]> {
    return this.machineRepository.find({
      where: { division_id: divisionId },
      relations: ['iotDevices'],
    });
  }

  async findOne(id: number): Promise<Machine> {
    const machine = await this.machineRepository.findOne({
      where: { machine_id: id },
      relations: ['division', 'iotDevices'],
    });

    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }

    return machine;
  }

  async update(id: number, updateMachineDto: UpdateMachineDto, userId: number): Promise<Machine> {
    const machine = await this.findOne(id);
    
    Object.assign(machine, {
      ...updateMachineDto,
      updated_by: userId,
    });

    return this.machineRepository.save(machine);
  }

  async remove(id: number): Promise<void> {
    const result = await this.machineRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
  }

  async getMachineMetrics(id: number) {
    const machine = await this.machineRepository
      .createQueryBuilder('machine')
      .leftJoinAndSelect('machine.iotDevices', 'iotDevice')
      .leftJoinAndSelect('iotDevice.measuredData', 'measuredData')
      .where('machine.machine_id = :id', { id })
      .getOne();

    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }

    const totalIotDevices = machine.iotDevices.length;
    const latestMeasurements = machine.iotDevices.map(device => {
      const latestData = device.measuredData
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
      return {
        device_id: device.iot_device_id,
        device_name: device.device_name,
        latest_measurement: latestData,
      };
    });

    return {
      machine_id: machine.machine_id,
      machine_name: machine.machine_name,
      total_iot_devices: totalIotDevices,
      power_consumption: machine.power_consumption,
      latest_measurements: latestMeasurements,
      last_maintenance_date: machine.last_maintenance_date,
      next_maintenance_date: machine.next_maintenance_date,
    };
  }
}