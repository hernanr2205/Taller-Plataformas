import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';

/**
 * Módulo de Perfiles
 *
 * Maneja toda la funcionalidad relacionada con perfiles de usuarios:
 * - CRUD de perfiles
 * - Gestión de objetivos y niveles de actividad
 * - Relaciones con usuarios
 */
@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
