import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  create(@Body() task: CreateTaskDto) {}
}
