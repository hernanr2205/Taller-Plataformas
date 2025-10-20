import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { Profile } from '../../profiles/entities/profile.entity';
import { WeeklyRoutine } from '../../routines/entities/weekly-routine.entity';

/**
 * Servicio de Usuarios
 *
 * Maneja toda la lógica de negocio relacionada con usuarios:
 * - Crear usuarios
 * - Obtener usuarios
 * - Actualizar usuarios
 * - Eliminar usuarios
 * - Gestión de relaciones
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  /**
   * Crear un nuevo usuario con su perfil por defecto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    // Crear perfil por defecto para el usuario
    const profile = this.profileRepository.create({
      user: savedUser,
    });
    await this.profileRepository.save(profile);

    // Retornar usuario con su perfil
    return this.findOne(savedUser.id);
  }

  /**
   * Obtener todos los usuarios con sus perfiles
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile', 'weeklyRoutines'],
    });
  }

  /**
   * Obtener un usuario por ID con sus relaciones
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'weeklyRoutines', 'weeklyRoutines.exercises'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  /**
   * Actualizar un usuario existente
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return this.findOne(id);
  }

  /**
   * Eliminar un usuario (elimina también su perfil y rutinas por cascade)
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  /**
   * Obtener todas las rutinas de un usuario
   */
  async findUserRoutines(id: number): Promise<WeeklyRoutine[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['weeklyRoutines', 'weeklyRoutines.exercises'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user.weeklyRoutines;
  }
}
