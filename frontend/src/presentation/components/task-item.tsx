import type { Task } from "@/domain/entities/task";
import { Priority } from "@/domain/enums/priority";
import { TaskStatus } from "@/domain/enums/task-status";
import type { UpdateTaskRequest } from "@/domain/interfaces/update-task-request";
import { Calendar, CheckCircle, Circle, Trash2 } from "lucide-react";

export const TaskItem: React.FC<{
  task: Task;
  onUpdate: (request: UpdateTaskRequest) => void;
  onDelete: (id: string) => void;
}> = ({ task, onUpdate, onDelete }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case TaskStatus.IN_PROGRESS:
        return <Circle className="w-5 h-5 text-yellow-600 fill-current" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case Priority.HIGH:
        return "border-l-red-500 bg-red-50";
      case Priority.MEDIUM:
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-green-500 bg-green-50";
    }
  };

  const toggleStatus = () => {
    const nextStatus =
      task.status === TaskStatus.TODO
        ? TaskStatus.IN_PROGRESS
        : task.status === TaskStatus.IN_PROGRESS
        ? TaskStatus.COMPLETED
        : TaskStatus.TODO;

    onUpdate({ id: task.id, status: nextStatus });
  };

  return (
    <div
      className={`p-4 rounded-lg border-l-4 ${getPriorityColor()} hover:shadow-md transition-shadow`}
      data-testid="task-item"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={toggleStatus} data-testid="toggle-task-status">
              {getStatusIcon()}
            </button>
            <h3
              className={`font-semibold ${
                task.status === TaskStatus.COMPLETED
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                task.priority === Priority.HIGH
                  ? "bg-red-200 text-red-800"
                  : task.priority === Priority.MEDIUM
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          )}

          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {task.dueDate.toLocaleDateString()}
            </div>
          )}
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          data-testid="delete-task-button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
