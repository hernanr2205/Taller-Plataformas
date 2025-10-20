import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  MinLength,
  Min,
  Max,
} from 'class-validator';

/**
 * DTO para crear un nuevo usuario
 */
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @IsNumber()
  @Min(1)
  @Max(500)
  weight: number;

  @IsNumber()
  @Min(1)
  @Max(300)
  height: number;
}

/**
 * DTO para actualizar un usuario existente
 */
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  weight?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(300)
  height?: number;
}
