import { IsNotEmpty, IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateParameterDto {
  @IsNumber()
  @IsNotEmpty()
  iot_device_type_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsDecimal()
  @IsNotEmpty()
  min_value: number;

  @IsDecimal()
  @IsNotEmpty()
  max_value: number;

  @IsDecimal()
  @IsNotEmpty()
  normal_min: number;

  @IsDecimal()
  @IsNotEmpty()
  normal_max: number;

  @IsDecimal()
  @IsNotEmpty()
  alert_threshold: number;

  @IsDecimal()
  @IsNotEmpty()
  critical_threshold: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateParameterDto extends CreateParameterDto {
  @IsNumber()
  @IsNotEmpty()
  parameter_id: number;
}

export class CreateMeasuredDataDto {
  @IsNumber()
  @IsNotEmpty()
  iot_device_id: number;

  @IsNumber()
  @IsNotEmpty()
  parameter_id: number;

  @IsDecimal()
  @IsNotEmpty()
  measured_value: number;
}