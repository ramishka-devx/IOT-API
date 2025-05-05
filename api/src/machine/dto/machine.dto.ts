import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMachineDto {
  @IsNumber()
  @IsNotEmpty()
  division_id: number;

  @IsNumber()
  @IsNotEmpty()
  machine_type_id: number;

  @IsString()
  @IsNotEmpty()
  machine_name: string;

  @IsString()
  @IsNotEmpty()
  serial_number: string;

  @IsDecimal()
  @IsNotEmpty()
  power_consumption: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  installation_date: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  warranty_expiry_date: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  last_maintenance_date: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  next_maintenance_date: Date;
}

export class UpdateMachineDto extends CreateMachineDto {
  @IsNumber()
  @IsNotEmpty()
  machine_id: number;
}

export class MachineMetricsDto {
  machine_id: number;
  machine_name: string;
  total_iot_devices: number;
  power_consumption: number;
  latest_measurements: {
    device_id: number;
    device_name: string;
    latest_measurement: any;
  }[];
  last_maintenance_date: Date;
  next_maintenance_date: Date;
}