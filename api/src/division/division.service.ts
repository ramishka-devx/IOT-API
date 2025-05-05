import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '../entities/division.entity';
import { DivisionType } from '../entities/division-type.entity';
import { CreateDivisionDto, UpdateDivisionDto } from './dto/division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
    @InjectRepository(DivisionType)
    private readonly divisionTypeRepository: Repository<DivisionType>,
  ) {}

  async create(createDivisionDto: CreateDivisionDto, userId: number): Promise<Division> {
    const division = this.divisionRepository.create({
      ...createDivisionDto,
      created_by: userId,
      updated_by: userId,
    });
    return this.divisionRepository.save(division);
  }

  async findAll(): Promise<Division[]> {
    return this.divisionRepository.find({
      relations: ['factory', 'divisionType', 'machines'],
    });
  }

  async findByFactory(factoryId: number): Promise<Division[]> {
    return this.divisionRepository.find({
      where: { factory_id: factoryId },
      relations: ['divisionType', 'machines'],
    });
  }

  async findOne(id: number): Promise<Division> {
    const division = await this.divisionRepository.findOne({
      where: { division_id: id },
      relations: ['factory', 'divisionType', 'machines', 'parent', 'children'],
    });

    if (!division) {
      throw new NotFoundException(`Division with ID ${id} not found`);
    }

    return division;
  }

  async update(id: number, updateDivisionDto: UpdateDivisionDto, userId: number): Promise<Division> {
    const division = await this.findOne(id);
    
    Object.assign(division, {
      ...updateDivisionDto,
      updated_by: userId,
    });

    return this.divisionRepository.save(division);
  }

  async remove(id: number): Promise<void> {
    const result = await this.divisionRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Division with ID ${id} not found`);
    }
  }

  async getDivisionMetrics(id: number) {
    const division = await this.divisionRepository
      .createQueryBuilder('division')
      .leftJoinAndSelect('division.machines', 'machine')
      .leftJoinAndSelect('machine.iotDevices', 'iotDevice')
      .where('division.division_id = :id', { id })
      .getOne();

    if (!division) {
      throw new NotFoundException(`Division with ID ${id} not found`);
    }

    const totalMachines = division.machines.length;
    const totalIotDevices = division.machines.reduce(
      (sum, machine) => sum + machine.iotDevices.length,
      0
    );

    return {
      division_id: division.division_id,
      title: division.title,
      total_machines: totalMachines,
      total_iot_devices: totalIotDevices,
      capacity: division.capacity,
      power_consumption: division.power_consumption,
    };
  }
}