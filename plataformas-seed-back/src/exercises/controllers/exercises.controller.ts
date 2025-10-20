import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ExercisesService } from '../services/exercises.service';
import {
  CreateExerciseDto,
  UpdateExerciseDto,
} from '../dto/create-exercise.dto';
import { Exercise } from '../entities/exercise.entity';

/**
 * Controlador de Ejercicios
 *
 * Maneja todas las rutas HTTP relacionadas con ejercicios:
 * - POST /exercises - Crear ejercicio
 * - GET /exercises - Listar ejercicios disponibles
 * - GET /exercises/:id - Obtener ejercicio
 * - PUT /exercises/:id - Actualizar ejercicio
 * - DELETE /exercises/:id - Eliminar ejercicio
 */
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  /**
   * Crear un nuevo ejercicio
   */
  @Post()
  async create(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return this.exercisesService.create(createExerciseDto);
  }

  /**
   * Obtener todos los ejercicios disponibles
   */
  @Get()
  async findAll(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  /**
   * Obtener un ejercicio por ID
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exercisesService.findOne(id);
  }

  /**
   * Actualizar un ejercicio
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  /**
   * Eliminar un ejercicio
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.exercisesService.remove(id);
  }
}
