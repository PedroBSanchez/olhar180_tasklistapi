import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UsePipes,
  ValidationPipe,
  Param,
  BadRequestException,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FindAllTasksDto } from './dtos/find-all-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAllTasks() {
    return await this.tasksService.findAllTasks();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() task: CreateTaskDto) {
    const tasks: FindAllTasksDto = await this.tasksService.create(task);
    return tasks;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param() params: any, @Body() task: UpdateTaskDto) {
    const taskId: number = params.id;

    if (!taskId) {
      throw new BadRequestException('task [id] is required in request params');
    }

    const updateTask = await await this.tasksService.update(taskId, task);

    if (!updateTask) {
      throw new BadRequestException('Task not found');
    }

    return updateTask;
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const taskId: number = params.id;

    if (!taskId) {
      throw new BadRequestException('task [id] is required in request params');
    }
    const deleteTask = await this.tasksService.delete(taskId);

    if (!deleteTask) {
      throw new BadRequestException('Task not found');
    }

    return deleteTask;
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  async changeTaskOpen(@Param() params: any) {
    const taskId: number = params.id;

    if (!taskId) {
      throw new BadRequestException('task [id] is required in request params');
    }

    const closeTask = await this.tasksService.closeTask(taskId);

    if (!closeTask) {
      throw new BadRequestException('Task not found');
    }

    return closeTask;
  }
}
