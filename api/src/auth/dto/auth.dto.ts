import { IsEmail, IsString, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  factory_id: number;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}

export class TokenPayloadDto {
  sub: number;
  email: string;
  role: string;
  factoryId: number;
}

export class UserProfileDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}