"use client";
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', notes: '', due: '' });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.error('Failed to fetch tasks:', data.error);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      
      if (data.success) {
        setTasks([...tasks, data.task]);
        setNewTask({ title: '', notes: '', due: '' });
      } else {
        console.error('Failed to create task:', data.error);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, ...updates }),
      });

      const data = await response.json();
      
      if (data.success) {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        ));
        setEditingTask(null);
      } else {
        console.error('Failed to update task:', data.error);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tasks?taskId=${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task:', data.error);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = (task) => {
    const newStatus = task.status === 'completed' ? 'needsAction' : 'completed';
    updateTask(task.id, { status: newStatus });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#1b203e] rounded-lg border border-[#1d293a] p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Task Manager</h2>
        
        {/* Add New Task Form */}
        <form onSubmit={createTask} className="mb-6 p-4 bg-[#10172d] rounded-lg border border-[#353a52]">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#16f2b3] mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#353a52] rounded-md text-white focus:border-[#16f2b3] focus:outline-none"
                placeholder="Enter task title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#16f2b3] mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#353a52] rounded-md text-white focus:border-[#16f2b3] focus:outline-none"
                placeholder="Add notes..."
                rows="2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#16f2b3] mb-2">
                Due Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={newTask.due}
                onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#353a52] rounded-md text-white focus:border-[#16f2b3] focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-md hover:from-pink-600 hover:to-violet-700 transition-all duration-200 disabled:opacity-50"
            >
              <FaPlus />
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>

        {/* Tasks List */}
        <div className="space-y-3">
          {loading && tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No tasks yet. Create your first task above!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border ${
                  task.status === 'completed'
                    ? 'bg-[#0a0e1a] border-[#2d3748] opacity-60'
                    : 'bg-[#10172d] border-[#353a52]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTaskStatus(task)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          task.status === 'completed'
                            ? 'bg-[#16f2b3] border-[#16f2b3]'
                            : 'border-[#353a52] hover:border-[#16f2b3]'
                        }`}
                      >
                        {task.status === 'completed' && <FaCheck className="text-white text-xs" />}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'
                        }`}>
                          {task.title}
                        </h3>
                        
                        {task.notes && (
                          <p className="text-sm text-gray-300 mt-1">{task.notes}</p>
                        )}
                        
                        {task.due && (
                          <p className="text-xs text-[#16f2b3] mt-1">
                            Due: {new Date(task.due).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setEditingTask(task.id)}
                      className="p-2 text-gray-400 hover:text-[#16f2b3] transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
