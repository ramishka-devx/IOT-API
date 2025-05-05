import { IsNotEmpty, IsString, IsDecimal, IsOptional, IsNumber } from 'class-validator';

export class CreateFactoryDto {
  @IsString()
  @IsNotEmpty()
  factory_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  gps_coordinates: string;

  @IsDecimal()
  @IsOptional()
  total_capacity?: number;

  @IsDecimal()
  @IsOptional()
  total_consumption?: number;

  @IsString()
  @IsNotEmpty()
  contact_person: string;

  @IsString()
  @IsNotEmpty()
  contact_email: string;

  @IsString()
  @IsNotEmpty()
  contact_phone: string;
}

export class UpdateFactoryDto extends CreateFactoryDto {
  @IsNumber()
  @IsNotEmpty()
  factory_id: number;
}

export class FactoryMetricsDto {
  factory_id: number;
  factory_name: string;
  total_divisions: number;
  total_machines: number;
  total_capacity: number;
  total_consumption: number;
}