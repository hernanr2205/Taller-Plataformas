import {
  IsEnum,
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { DayOfWeek } from '../entities/weekly-routine.entity';

/**
 * DTO para crear una nueva rutina semanal
 */
export class CreateRoutineDto {
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNumber()
  userId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  exerciseIds: number[];
}

/**
 * DTO para actualizar una rutina semanal existente
 */
export class UpdateRoutineDto {
  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  exerciseIds?: number[];
}

/**
 * DTO para marcar una rutina como completada
 */
export class CompleteRoutineDto {
  @IsBoolean()
  completed: boolean;
}

/**
 * DTO para agregar ejercicios a una rutina
 */
export class AddExerciseToRoutineDto {
  @IsNumber()
  exerciseId: number;
}
