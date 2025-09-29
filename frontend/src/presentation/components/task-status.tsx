import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { TaskService } from '@/application/services/task-service';

interface TaskStatsProps {
  taskService: TaskService;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ taskService }) => {
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, todo: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const taskStats = await taskService.getTaskStats();
      setStats(taskStats);
    };
    loadStats();
  }, [taskService]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900" data-testid="total-tasks">{stats.total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600" data-testid="completed-tasks">{stats.completed}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <Circle className="w-8 h-8 text-yellow-600 fill-current" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600" data-testid="in-progress-tasks">{stats.inProgress}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <Circle className="w-8 h-8 text-gray-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">To Do</p>
            <p className="text-2xl font-bold text-gray-600" data-testid="todo-tasks">{stats.todo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};