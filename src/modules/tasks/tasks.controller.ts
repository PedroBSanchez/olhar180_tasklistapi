import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.getTasks();
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() task: CreateTaskDto) {
    console.log(task);
  }
}
