import { TaskStatusEnum } from '../enum/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllTasksDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  conclusionDate: Date;
}
