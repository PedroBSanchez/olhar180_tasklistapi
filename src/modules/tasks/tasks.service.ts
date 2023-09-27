import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
  ) {}

  async getTasks(): Promise<any> {
    console.log('save');
    const newTask: CreateTaskDto = { title: 'ok' };

    console.log(
      await this.tasksRepository.save(this.tasksRepository.create(newTask)),
    );
    return [];
  }

  create() {}
}
