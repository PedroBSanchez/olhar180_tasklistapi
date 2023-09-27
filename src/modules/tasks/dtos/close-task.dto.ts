import { IsBoolean } from 'class-validator';
export class CloseTaskDto {
  @IsBoolean()
  isOpen: boolean;
}
