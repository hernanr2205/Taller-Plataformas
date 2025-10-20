import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyRoutine } from './entities/weekly-routine.entity';
import { User } from '../users/entities/user.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { RoutinesService } from './services/routines.service';
import { RoutinesController } from './controllers/routines.controller';

/**
 * Módulo de Rutinas Semanales
 *
 * Maneja toda la funcionalidad relacionada con rutinas semanales:
 * - CRUD de rutinas
 * - Gestión de ejercicios en rutinas
 * - Relaciones con usuarios y ejercicios
 */
@Module({
  imports: [TypeOrmModule.forFeature([WeeklyRoutine, User, Exercise])],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
