import { Priority } from "../enums/priority";
import { TaskStatus } from "../enums/task-status";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}