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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FindAllTasksDto } from './dtos/find-all-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';

@ApiTags('tasks')
@UseGuards(AuthGuard('jwt'))
@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAllTasks(@Req() req: any, @Query() query: any) {
    const title = query.title || '';
    const priority = query.priority || '';
    const userId: number = req.user.id;
    return await this.tasksService.findAllTasks(userId, title, priority);
  }

  @Get(':id')
  async findTask(@Param() params: any) {
    const taskId: number = params.id;

    if (!taskId) {
      throw new BadRequestException('task [id] is required in request params');
    }

    const task = await this.tasksService.findTask(taskId);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Req() req: any, @Body() task: CreateTaskDto) {
    const userId = req.user.id;
    const tasks: FindAllTasksDto = await this.tasksService.create(task, userId);
    return tasks;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param() params: any, @Body() task: UpdateTaskDto) {
    const taskId: number = params.id;

    if (!taskId) {
      throw new BadRequestException('task [id] is required in request params');
    }

    const updateTask = await this.tasksService.update(taskId, task);

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
