import { Priority } from '../enums/priority';

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date | null;
}