import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from '../entities/factory.entity';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Factory])],
  providers: [FactoryService],
  controllers: [FactoryController],
  exports: [FactoryService],
})
export class FactoryModule {}