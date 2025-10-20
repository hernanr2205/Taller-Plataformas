import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WeeklyRoutine } from '../../routines/entities/weekly-routine.entity';

/**
 * Entidad Exercise - Catálogo de ejercicios disponibles en la aplicación
 *
 * Relaciones:
 * - N:M con WeeklyRoutine (un ejercicio puede estar en múltiples rutinas)
 */
@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  reps: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  videoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToMany(() => WeeklyRoutine, (weeklyRoutine) => weeklyRoutine.exercises)
  weeklyRoutines: WeeklyRoutine[];
}
