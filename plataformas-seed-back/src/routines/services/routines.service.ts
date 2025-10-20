import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeeklyRoutine } from '../entities/weekly-routine.entity';
import {
  CreateRoutineDto,
  UpdateRoutineDto,
  CompleteRoutineDto,
  AddExerciseToRoutineDto,
} from '../dto/create-routine.dto';
import { User } from '../../users/entities/user.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

/**
 * Servicio de Rutinas Semanales
 *
 * Maneja toda la lógica de negocio relacionada con rutinas semanales:
 * - Crear rutinas
 * - Obtener rutinas
 * - Actualizar rutinas
 * - Eliminar rutinas
 * - Marcar como completadas
 * - Gestión de ejercicios en rutinas
 */
@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(WeeklyRoutine)
    private readonly routineRepository: Repository<WeeklyRoutine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  /**
   * Crear una nueva rutina semanal
   */
  async create(createRoutineDto: CreateRoutineDto): Promise<WeeklyRoutine> {
    const { exerciseIds, ...routineData } = createRoutineDto;

    // Verificar que el usuario existe
    const user = await this.userRepository.findOne({
      where: { id: routineData['userId'] },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${routineData['userId']} no encontrado`,
      );
    }

    // Obtener los ejercicios
    const exercises = await this.exerciseRepository.findByIds(exerciseIds);
    if (exercises.length !== exerciseIds.length) {
      throw new NotFoundException('Uno o más ejercicios no fueron encontrados');
    }

    const routine = this.routineRepository.create({
      ...routineData,
      user,
      exercises,
    });

    return this.routineRepository.save(routine);
  }

  /**
   * Obtener todas las rutinas con filtros opcionales
   */
  async findAll(filters?: {
    dayOfWeek?: string;
    completed?: boolean;
    userId?: number;
  }): Promise<WeeklyRoutine[]> {
    const queryBuilder = this.routineRepository
      .createQueryBuilder('routine')
      .leftJoinAndSelect('routine.user', 'user')
      .leftJoinAndSelect('routine.exercises', 'exercises');

    if (filters?.dayOfWeek) {
      queryBuilder.andWhere('routine.dayOfWeek = :dayOfWeek', {
        dayOfWeek: filters.dayOfWeek,
      });
    }

    if (filters?.completed !== undefined) {
      queryBuilder.andWhere('routine.completed = :completed', {
        completed: filters.completed,
      });
    }

    if (filters?.userId) {
      queryBuilder.andWhere('routine.user.id = :userId', {
        userId: filters.userId,
      });
    }

    return queryBuilder.getMany();
  }

  /**
   * Obtener una rutina por ID
   */
  async findOne(id: number): Promise<WeeklyRoutine> {
    const routine = await this.routineRepository.findOne({
      where: { id },
      relations: ['user', 'exercises'],
    });

    if (!routine) {
      throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    }

    return routine;
  }

  /**
   * Actualizar una rutina existente
   */
  async update(
    id: number,
    updateRoutineDto: UpdateRoutineDto,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(id);
    const { exerciseIds, ...routineData } = updateRoutineDto;

    // Si se proporcionan nuevos ejercicios, actualizarlos
    if (exerciseIds) {
      const exercises = await this.exerciseRepository.findByIds(exerciseIds);
      if (exercises.length !== exerciseIds.length) {
        throw new NotFoundException(
          'Uno o más ejercicios no fueron encontrados',
        );
      }
      routine.exercises = exercises;
    }

    Object.assign(routine, routineData);
    await this.routineRepository.save(routine);

    return this.findOne(id);
  }

  /**
   * Eliminar una rutina
   */
  async remove(id: number): Promise<void> {
    const routine = await this.findOne(id);
    await this.routineRepository.remove(routine);
  }

  /**
   * Marcar una rutina como completada
   */
  async complete(
    id: number,
    completeRoutineDto: CompleteRoutineDto,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(id);

    routine.completed = completeRoutineDto.completed;
    await this.routineRepository.save(routine);

    return this.findOne(id);
  }

  /**
   * Agregar un ejercicio a una rutina
   */
  async addExercise(
    routineId: number,
    addExerciseDto: AddExerciseToRoutineDto,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(routineId);
    const exercise = await this.exerciseRepository.findOne({
      where: { id: addExerciseDto.exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(
        `Ejercicio con ID ${addExerciseDto.exerciseId} no encontrado`,
      );
    }

    // Verificar si el ejercicio ya está en la rutina
    const exerciseExists = routine.exercises.some(
      (ex) => ex.id === exercise.id,
    );
    if (!exerciseExists) {
      routine.exercises.push(exercise);
      await this.routineRepository.save(routine);
    }

    return this.findOne(routineId);
  }

  /**
   * Eliminar un ejercicio de una rutina
   */
  async removeExercise(
    routineId: number,
    exerciseId: number,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(routineId);

    routine.exercises = routine.exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );
    await this.routineRepository.save(routine);

    return this.findOne(routineId);
  }
}
