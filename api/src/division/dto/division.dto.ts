import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsOptional } from 'class-validator';

export class CreateDivisionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  factory_id: number;

  @IsNumber()
  @IsNotEmpty()
  division_type_id: number;

  @IsNumber()
  @IsOptional()
  parent_id?: number;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsDecimal()
  @IsOptional()
  capacity?: number;

  @IsDecimal()
  @IsOptional()
  power_consumption?: number;

  @IsString()
  @IsNotEmpty()
  manager_name: string;

  @IsString()
  @IsNotEmpty()
  manager_contact: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateDivisionDto extends CreateDivisionDto {
  @IsNumber()
  @IsNotEmpty()
  division_id: number;
}

export class DivisionMetricsDto {
  division_id: number;
  title: string;
  total_machines: number;
  total_iot_devices: number;
  capacity: number;
  power_consumption: number;
}