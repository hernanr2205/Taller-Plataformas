import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { ExercisesService } from './services/exercises.service';
import { ExercisesController } from './controllers/exercises.controller';

/**
 * Módulo de Ejercicios
 *
 * Maneja toda la funcionalidad relacionada con ejercicios:
 * - CRUD de ejercicios
 * - Catálogo de ejercicios disponibles
 * - Relaciones con rutinas
 */
@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
