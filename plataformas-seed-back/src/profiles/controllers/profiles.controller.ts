import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { UpdateProfileDto } from '../dto/create-profile.dto';
import { Profile } from '../entities/profile.entity';

/**
 * Controlador de Perfiles
 *
 * Maneja todas las rutas HTTP relacionadas con perfiles:
 * - GET /profiles/:userId - Obtener perfil de un usuario
 * - PUT /profiles/:userId - Actualizar perfil
 */
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  /**
   * Obtener el perfil de un usuario
   */
  @Get(':userId')
  async findOne(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Profile> {
    return this.profilesService.findOne(userId);
  }

  /**
   * Actualizar el perfil de un usuario
   */
  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profilesService.update(userId, updateProfileDto);
  }
}
