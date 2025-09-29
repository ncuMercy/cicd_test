import type { Task } from "@/domain/entities/task";
import { TaskStatus } from "@/domain/enums/task-status";
import type { CreateTaskRequest } from "@/domain/interfaces/create-task-request";
import type { TaskFilter } from "@/domain/interfaces/task-filter";
import type { UpdateTaskRequest } from "@/domain/interfaces/update-task-request";
import { TaskRepository } from "@/infrastructure/repositories/task-repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(filter?: TaskFilter): Promise<Task[]> {
    let tasks = await this.taskRepository.findAll();

    if (filter?.status) {
      tasks = tasks.filter((task) => task.status === filter.status);
    }

    if (filter?.priority) {
      tasks = tasks.filter((task) => task.priority === filter.priority);
    }

    if (filter?.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
      );
    }

    return tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTask(request: CreateTaskRequest): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      title: request.title,
      description: request.description,
      status: TaskStatus.TODO,
      priority: request.priority,
      dueDate: request.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.taskRepository.save(task);
  }

  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    const existingTask = await this.taskRepository.findById(request.id);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    const updatedTask: Task = {
      ...existingTask,
      ...request,
      updatedAt: new Date(),
    };

    return await this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async getTaskStats(): Promise<{
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  }> {
    const tasks = await this.taskRepository.findAll();
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
      inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS)
        .length,
      todo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
    };
  }
}