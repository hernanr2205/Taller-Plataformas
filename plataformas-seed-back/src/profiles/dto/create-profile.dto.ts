import { IsEnum, IsOptional } from 'class-validator';
import { Goal, ActivityLevel } from '../entities/profile.entity';

/**
 * DTO para crear un nuevo perfil
 */
export class CreateProfileDto {
  @IsEnum(Goal)
  goal: Goal;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;
}

/**
 * DTO para actualizar un perfil existente
 */
export class UpdateProfileDto {
  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal;

  @IsOptional()
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel;
}
