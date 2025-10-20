import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoutinesService } from '../services/routines.service';
import {
  CreateRoutineDto,
  UpdateRoutineDto,
  CompleteRoutineDto,
  AddExerciseToRoutineDto,
} from '../dto/create-routine.dto';
import { WeeklyRoutine } from '../entities/weekly-routine.entity';

/**
 * Controlador de Rutinas Semanales
 *
 * Maneja todas las rutas HTTP relacionadas con rutinas semanales:
 * - POST /routines - Crear rutina semanal
 * - GET /routines/:id - Obtener rutina por id
 * - GET /routines - Listar rutinas
 * - PUT /routines/:id - Actualizar rutina
 * - DELETE /routines/:id - Eliminar rutina
 * - PATCH /routines/:id/complete - Marcar rutina como completada
 * - POST /routines/:routineId/exercises - Agregar ejercicio a rutina
 * - DELETE /routines/:routineId/exercises/:exerciseId - Eliminar ejercicio de rutina
 */
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  /**
   * Crear una nueva rutina semanal
   */
  @Post()
  async create(
    @Body() createRoutineDto: CreateRoutineDto,
  ): Promise<WeeklyRoutine> {
    return this.routinesService.create(createRoutineDto);
  }

  /**
   * Obtener todas las rutinas con filtros opcionales
   */
  @Get()
  async findAll(
    @Query('dayOfWeek') dayOfWeek?: string,
    @Query('completed') completed?: string,
    @Query('userId') userId?: string,
  ): Promise<WeeklyRoutine[]> {
    const filters: {
      dayOfWeek?: string;
      completed?: boolean;
      userId?: number;
    } = {};

    if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
    if (completed !== undefined) filters.completed = completed === 'true';
    if (userId) filters.userId = parseInt(userId);

    return this.routinesService.findAll(filters);
  }

  /**
   * Obtener una rutina por ID
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WeeklyRoutine> {
    return this.routinesService.findOne(id);
  }

  /**
   * Actualizar una rutina
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ): Promise<WeeklyRoutine> {
    return this.routinesService.update(id, updateRoutineDto);
  }

  /**
   * Eliminar una rutina
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.routinesService.remove(id);
  }

  /**
   * Marcar una rutina como completada
   */
  @Patch(':id/complete')
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() completeRoutineDto: CompleteRoutineDto,
  ): Promise<WeeklyRoutine> {
    return this.routinesService.complete(id, completeRoutineDto);
  }

  /**
   * Agregar un ejercicio a una rutina
   */
  @Post(':routineId/exercises')
  async addExercise(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Body() addExerciseDto: AddExerciseToRoutineDto,
  ): Promise<WeeklyRoutine> {
    return this.routinesService.addExercise(routineId, addExerciseDto);
  }

  /**
   * Eliminar un ejercicio de una rutina
   */
  @Delete(':routineId/exercises/:exerciseId')
  async removeExercise(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ): Promise<WeeklyRoutine> {
    return this.routinesService.removeExercise(routineId, exerciseId);
  }
}
