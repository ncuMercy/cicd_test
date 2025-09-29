import { useCallback, useEffect, useState } from "react";
import { TaskService } from "../services/task-service";
import { TaskRepository } from "@/infrastructure/repositories/task-repository";
import type { Task } from "@/domain/entities/task";
import type { TaskFilter } from "@/domain/interfaces/task-filter";
import type { CreateTaskRequest } from "@/domain/interfaces/create-task-request";
import type { UpdateTaskRequest } from "@/domain/interfaces/update-task-request";

export const useTaskManagement = () => {
  const [taskService] = useState(() => new TaskService(new TaskRepository()));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({});
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const loadedTasks = await taskService.getAllTasks(filter);
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [taskService, filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (request: CreateTaskRequest) => {
    try {
      await taskService.createTask(request);
      await loadTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTask = async (request: UpdateTaskRequest) => {
    try {
      await taskService.updateTask(request);
      await loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return {
    tasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    taskService,
  };
};
