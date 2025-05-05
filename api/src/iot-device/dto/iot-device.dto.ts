import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateIotDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  iot_device_type_id: number;

  @IsNumber()
  @IsNotEmpty()
  machine_id: number;

  @IsString()
  @IsNotEmpty()
  device_name: string;

  @IsString()
  @IsNotEmpty()
  serial_number: string;

  @IsString()
  @IsNotEmpty()
  firmware_version: string;

  @IsDate()
  @IsNotEmpty()
  installation_date: Date;

  @IsDate()
  @IsNotEmpty()
  last_calibration_date: Date;

  @IsDate()
  @IsNotEmpty()
  next_calibration_date: Date;
}

export class UpdateIotDeviceDto extends CreateIotDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  iot_device_id: number;
}

export class CreateIotDeviceTypeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateIotDeviceTypeDto extends CreateIotDeviceTypeDto {
  @IsNumber()
  @IsNotEmpty()
  iot_device_type_id: number;
}