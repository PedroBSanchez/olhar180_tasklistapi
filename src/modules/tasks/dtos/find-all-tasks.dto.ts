import { TaskStatusEnum } from '../enum/task-status.enum';

export class FindAllTasksDto {
  title: string;
  description: string;
  conclusionDate: Date;
}
