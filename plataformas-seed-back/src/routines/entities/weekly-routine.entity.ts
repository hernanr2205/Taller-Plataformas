import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

/**
 * Enum para los días de la semana
 */
export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

/**
 * Entidad WeeklyRoutine - Representa una rutina de ejercicios planificada para un día específico de la semana
 *
 * Relaciones:
 * - N:1 con User (muchas rutinas pertenecen a un usuario)
 * - N:M con Exercise (una rutina puede contener múltiples ejercicios)
 */
@Entity('weekly_routines')
export class WeeklyRoutine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  dayOfWeek: DayOfWeek;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => User, (user) => user.weeklyRoutines, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Exercise, (exercise) => exercise.weeklyRoutines)
  @JoinTable({
    name: 'weekly_routine_exercises',
    joinColumn: {
      name: 'weeklyRoutineId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'exerciseId',
      referencedColumnName: 'id',
    },
  })
  exercises: Exercise[];
}
