import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { WeeklyRoutine } from '../../routines/entities/weekly-routine.entity';

/**
 * Entidad User - Representa a cada usuario registrado en la aplicación
 *
 * Relaciones:
 * - 1:1 con Profile (un usuario tiene un único perfil)
 * - 1:N con WeeklyRoutine (un usuario puede tener múltiples rutinas semanales)
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column({ type: 'int' })
  height: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => WeeklyRoutine, (weeklyRoutine) => weeklyRoutine.user, {
    cascade: true,
  })
  weeklyRoutines: WeeklyRoutine[];
}
