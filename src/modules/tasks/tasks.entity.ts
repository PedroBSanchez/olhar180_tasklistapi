import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatusEnum } from './enum/task-status.enum';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  conclusionDate: Date;

  @Column({ type: 'enum', enum: TaskStatusEnum })
  priority: TaskStatusEnum;

  @Column({ default: true })
  isOpen: boolean;
}
