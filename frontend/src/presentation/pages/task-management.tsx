import React, { useState } from "react";
import {
  Search,
  Plus
} from "lucide-react";
import type { TaskFilter } from "@/domain/interfaces/task-filter";
import { TaskForm } from "../components/task-form";
import { TaskItem } from "../components/task-item";
import { Priority } from "@/domain/enums/priority";
import { TaskStatus } from "@/domain/enums/task-status";
import { TaskStats } from "../components/task-status";
import { useTaskManagement } from "@/application/hooks/use-task-management";
import type { CreateTaskRequest } from "@/domain/interfaces/create-task-request";

const TaskManagementApp: React.FC = () => {
  const {
    tasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    taskService,
  } = useTaskManagement();

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateTask = (taskData: CreateTaskRequest) => {
    createTask(taskData);
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with clean architecture
          </p>
        </div>

        {/* Statistics */}
        <TaskStats taskService={taskService} />

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filter.searchTerm || ""}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-testid="search-input"
              />
            </div>

            {/* Filters */}
            <select
              value={filter.status || ""}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  status: (e.target.value as TaskStatus) || undefined,
                }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="status-filter"
            >
              <option value="">All Status</option>
              <option value={TaskStatus.TODO}>To Do</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </select>

            <select
              value={filter.priority || ""}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  priority: (e.target.value as Priority) || undefined,
                }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="priority-filter"
            >
              <option value="">All Priority</option>
              <option value={Priority.HIGH}>High</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.LOW}>Low</option>
            </select>

            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="add-task-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500" data-testid="no-tasks-message">
                {Object.keys(filter).some(
                  (key) => filter[key as keyof TaskFilter]
                )
                  ? "No tasks match your filters"
                  : "No tasks yet. Create your first task!"}
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {/* Create Task Form Modal */}
        {showCreateForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagementApp;
