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
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { WeeklyRoutine } from '../../routines/entities/weekly-routine.entity';

/**
 * Controlador de Usuarios
 *
 * Maneja todas las rutas HTTP relacionadas con usuarios:
 * - POST /users - Crear usuario
 * - GET /users - Obtener lista de usuarios
 * - GET /users/:id - Obtener usuario por id
 * - PUT /users/:id - Actualizar usuario
 * - DELETE /users/:id - Eliminar usuario
 * - GET /users/:id/routines - Obtener rutinas del usuario
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Crear un nuevo usuario
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Obtener todos los usuarios
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Obtener un usuario por ID
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Actualizar un usuario
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Eliminar un usuario
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  /**
   * Obtener todas las rutinas de un usuario
   */
  @Get(':id/routines')
  findUserRoutines(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WeeklyRoutine[]> {
    return this.usersService.findUserRoutines(id);
  }
}
