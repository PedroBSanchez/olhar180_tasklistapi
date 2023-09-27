import { IsDate, IsString, IsISO8601 } from 'class-validator';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsISO8601({ strict: true })
  conclusionDate: Date;

  @IsString()
  priority: TaskStatusEnum;
}
