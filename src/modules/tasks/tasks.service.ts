import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FindAllTasksDto } from './dtos/find-all-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { TaskStatusEnum } from './enum/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    private readonly userService: UsersService,
  ) {}

  async create(newTask: CreateTaskDto, userId: number): Promise<TasksEntity> {
    const createTask = await this.tasksRepository.create(newTask);

    const user = await this.userService.findById(userId);
    createTask.user = user;

    return await this.tasksRepository.save(createTask);
  }

  async findAllTasks(
    userId: number,
    title: string,
    priority: string,
  ): Promise<Array<TasksEntity>> {
    const query = this.tasksRepository.createQueryBuilder('tasks');

    let priorityEnum: any = '';

    switch (priority) {
      case (priority = 'ALTA'):
        priorityEnum = TaskStatusEnum.ALTA;
        break;

      case (priority = 'MEDIA'):
        priorityEnum = TaskStatusEnum.MEDIA;
        break;

      case (priority = 'BAIXA'):
        priorityEnum = TaskStatusEnum.BAIXA;
        break;

      default:
        priorityEnum = '';
        break;
    }

    return await query
      .where('tasks.user.id = :id', { id: userId })
      .andWhere('LOWER(tasks.title) LIKE :title', {
        title: `%${title.toLocaleLowerCase()}%`,
      })
      .andWhere(priorityEnum !== '' ? 'tasks.priority = :enumValue' : '1 = 1', {
        enumValue: priorityEnum,
      })
      .orderBy('tasks.id', 'DESC')
      .getMany();
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

  public async findTask(taskId: number): Promise<any> {
    return await this.tasksRepository.findOne({
      where: {
        id: taskId,
      },
    });
  }
}
