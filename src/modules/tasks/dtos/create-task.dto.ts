import { IsDate, IsString, IsISO8601 } from 'class-validator';
import { TaskStatusEnum } from '../enum/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsISO8601({ strict: true })
  conclusionDate: Date;

  @ApiProperty()
  @IsString()
  priority: TaskStatusEnum;
}
