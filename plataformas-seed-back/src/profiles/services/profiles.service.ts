import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto, UpdateProfileDto } from '../dto/create-profile.dto';
import { User } from '../../users/entities/user.entity';

/**
 * Servicio de Perfiles
 *
 * Maneja toda la lógica de negocio relacionada con perfiles:
 * - Crear perfiles
 * - Obtener perfiles
 * - Actualizar perfiles
 * - Eliminar perfiles
 * - Gestión de objetivos y niveles de actividad
 */
@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crear un nuevo perfil para un usuario
   */
  async create(
    userId: number,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    return this.profileRepository.save(profile);
  }

  /**
   * Obtener el perfil de un usuario por su ID
   */
  async findOne(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(
        `Perfil para usuario con ID ${userId} no encontrado`,
      );
    }

    return profile;
  }

  /**
   * Actualizar el perfil de un usuario
   */
  async update(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOne(userId);

    Object.assign(profile, updateProfileDto);
    await this.profileRepository.save(profile);

    return this.findOne(userId);
  }

  /**
   * Eliminar el perfil de un usuario
   */
  async remove(userId: number): Promise<void> {
    const profile = await this.findOne(userId);
    await this.profileRepository.remove(profile);
  }
}
