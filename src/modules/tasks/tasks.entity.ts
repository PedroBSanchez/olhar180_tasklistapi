import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;
}
