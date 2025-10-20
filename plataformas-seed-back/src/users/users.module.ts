import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

/**
 * Módulo de Usuarios
 *
 * Maneja toda la funcionalidad relacionada con usuarios:
 * - CRUD de usuarios
 * - Gestión de perfiles
 * - Relaciones con rutinas
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
