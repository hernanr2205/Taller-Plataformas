import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import {
  CreateExerciseDto,
  UpdateExerciseDto,
} from '../dto/create-exercise.dto';

/**
 * Servicio de Ejercicios
 *
 * Maneja toda la lógica de negocio relacionada con ejercicios:
 * - Crear ejercicios
 * - Obtener ejercicios
 * - Actualizar ejercicios
 * - Eliminar ejercicios
 * - Gestión del catálogo
 */
@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  /**
   * Crear un nuevo ejercicio
   */
  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(createExerciseDto);
    return this.exerciseRepository.save(exercise);
  }

  /**
   * Obtener todos los ejercicios disponibles
   */
  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({
      relations: ['weeklyRoutines'],
    });
  }

  /**
   * Obtener un ejercicio por ID
   */
  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['weeklyRoutines'],
    });

    if (!exercise) {
      throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
    }

    return exercise;
  }

  /**
   * Actualizar un ejercicio existente
   */
  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const exercise = await this.findOne(id);

    Object.assign(exercise, updateExerciseDto);
    await this.exerciseRepository.save(exercise);

    return this.findOne(id);
  }

  /**
   * Eliminar un ejercicio
   */
  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id);
    await this.exerciseRepository.remove(exercise);
  }
}

