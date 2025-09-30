import { Priority } from "@/domain/enums/priority";
import type { CreateTaskRequest } from "@/domain/interfaces/create-task-request";
import { useState } from "react";

export interface TaskFormProps {
  onSubmit: (task: CreateTaskRequest) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: "",
    description: "",
    priority: Priority.MEDIUM,
    dueDate: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        priority: Priority.MEDIUM,
        dueDate: null,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="task-title-input"
        />

        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
          data-testid="task-description-input"
        />

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              priority: e.target.value as Priority,
            }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="task-priority-select"
        >
          <option value={Priority.LOW}>Low Priority</option>
          <option value={Priority.MEDIUM}>Medium Priority</option>
          <option value={Priority.HIGH}>High Priority</option>
        </select>

        <input
          type="date"
          value={
            formData.dueDate ? formData.dueDate.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dueDate: e.target.value ? new Date(e.target.value) : null,
            }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="task-due-date-input"
        />

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="create-task-button"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            data-testid="cancel-task-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;