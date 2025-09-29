import { Priority } from "../enums/priority";
import { TaskStatus } from "../enums/task-status";

export interface TaskFilter {
  status?: TaskStatus;
  priority?: Priority;
  searchTerm?: string;
}