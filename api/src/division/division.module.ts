import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from '../entities/division.entity';
import { DivisionType } from '../entities/division-type.entity';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Division, DivisionType])],
  providers: [DivisionService],
  controllers: [DivisionController],
  exports: [DivisionService],
})
export class DivisionModule {}