import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FindAllTasksDto } from './dtos/find-all-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
  ) {}

  async create(newTask: CreateTaskDto): Promise<TasksEntity> {
    return await this.tasksRepository.save(
      this.tasksRepository.create(newTask),
    );
  }

  async findAllTasks(): Promise<Array<TasksEntity>> {
    const query = this.tasksRepository.createQueryBuilder('tasks');
    return await query.orderBy('tasks.id', 'DESC').getMany();
  }

  async update(taskId: number, task: UpdateTaskDto): Promise<any> {
    const taskInDb = await this.findTask(taskId);
    if (!taskInDb) {
      return false;
    }
    const query = this.tasksRepository.createQueryBuilder('tasks');

    return await query
      .update()
      .set({
        title: task.title,
        description: task.description,
        conclusionDate: task.conclusionDate,
        priority: task.priority,
      })
      .where('tasks.id = :id', { id: taskId })
      .execute();
  }

  async delete(taskId: number): Promise<any> {
    const taskInDb = await this.findTask(taskId);
    if (!taskInDb) {
      return false;
    }
    const query = this.tasksRepository.createQueryBuilder('tasks');
    return await query
      .delete()
      .where('tasks.id = :id', { id: taskId })
      .execute();
  }

  async closeTask(taskId: number): Promise<any> {
    const taskInDb = await this.findTask(taskId);

    if (!taskInDb) {
      return false;
    }

    const query = this.tasksRepository.createQueryBuilder('tasks');
    return await query
      .update()
      .set({ isOpen: !taskInDb.isOpen })
      .where('tasks.id = :id', { id: taskId })
      .execute();
  }

  private async findTask(taskId: number): Promise<any> {
    const query = this.tasksRepository.createQueryBuilder('tasks');

    const taskInDb = await query
      .where('tasks.id = :id', { id: taskId })
      .getOne();

    if (!taskInDb) {
      return false;
    }

    return taskInDb;
  }
}
