import type { Task } from "@/domain/entities/task";

export class TaskRepository {
  private static readonly STORAGE_KEY = "tasks";

  async findAll(): Promise<Task[]> {
    const stored = localStorage.getItem(TaskRepository.STORAGE_KEY);
    if (!stored) return [];

    return JSON.parse(stored).map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = await this.findAll();
    return tasks.find((task) => task.id === id) || null;
  }

  async save(task: Task): Promise<Task> {
    const tasks = await this.findAll();
    const existingIndex = tasks.findIndex((t) => t.id === task.id);

    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.push(task);
    }

    localStorage.setItem(TaskRepository.STORAGE_KEY, JSON.stringify(tasks));
    return task;
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.findAll();
    const filtered = tasks.filter((task) => task.id !== id);
    localStorage.setItem(TaskRepository.STORAGE_KEY, JSON.stringify(filtered));
  }
}
