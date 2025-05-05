import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../entities/factory.entity';
import { CreateFactoryDto, UpdateFactoryDto } from './dto/factory.dto';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async create(createFactoryDto: CreateFactoryDto, userId: number): Promise<Factory> {
    const factory = this.factoryRepository.create({
      ...createFactoryDto,
      created_by: userId,
      updated_by: userId,
    });
    return this.factoryRepository.save(factory);
  }

  async findAll(): Promise<Factory[]> {
    return this.factoryRepository.find({
      relations: ['divisions'],
    });
  }

  async findOne(id: number): Promise<Factory> {
    const factory = await this.factoryRepository.findOne({
      where: { factory_id: id },
      relations: ['divisions'],
    });

    if (!factory) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }

    return factory;
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto, userId: number): Promise<Factory> {
    const factory = await this.findOne(id);
    
    Object.assign(factory, {
      ...updateFactoryDto,
      updated_by: userId,
    });

    return this.factoryRepository.save(factory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.factoryRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }
  }

  async getFactoryMetrics(id: number) {
    const factory = await this.factoryRepository
      .createQueryBuilder('factory')
      .leftJoinAndSelect('factory.divisions', 'division')
      .leftJoinAndSelect('division.machines', 'machine')
      .where('factory.factory_id = :id', { id })
      .getOne();

    if (!factory) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }

    const totalMachines = factory.divisions.reduce(
      (sum, division) => sum + division.machines.length,
      0
    );

    const totalPowerConsumption = factory.divisions.reduce(
      (sum, division) => sum + Number(division.power_consumption),
      0
    );

    return {
      factory_id: factory.factory_id,
      factory_name: factory.factory_name,
      total_divisions: factory.divisions.length,
      total_machines: totalMachines,
      total_capacity: factory.total_capacity,
      total_consumption: totalPowerConsumption,
    };
  }
}