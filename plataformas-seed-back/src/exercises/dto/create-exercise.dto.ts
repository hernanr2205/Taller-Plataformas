import { IsString, IsOptional, IsUrl, MinLength } from 'class-validator';

/**
 * DTO para crear un nuevo ejercicio
 */
export class CreateExerciseDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(10)
  reps: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}

/**
 * DTO para actualizar un ejercicio existente
 */
export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  reps?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
