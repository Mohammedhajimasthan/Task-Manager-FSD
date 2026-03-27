"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchTasks = useCallback(async (page = 1, resetFilters = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });

      const res = await fetch(`/api/tasks?${params.toString()}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
        setPagination(data.pagination);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, router]);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [fetchTasks, currentPage]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          status: "pending",
        }),
      });

      if (res.ok) {
        setFormData({ title: "", description: "" });
        fetchTasks(1, true);
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task["status"]) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-800">TaskMaster</h1>
            <p className="mt-4 text-slate-600 text-base md:text-lg max-w-2xl">Your team’s command center for tasks, timelines, and accountability.</p>
          </div>
          <button
            type="button"
            className="btn-primary px-8 py-3"
            onClick={() => document.getElementById('create-task-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Add New Task
          </button>
        </div>

        <div id="create-task-form" className="glass p-6 rounded-3xl shadow-xl mb-8">
          <form onSubmit={handleCreateTask} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field"
            />
            <button type="submit" className="btn-primary w-full">Create Task</button>
          </form>
        </div>

        {/* Filters */}
        <div className="glass p-6 rounded-3xl mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="input-field"
            />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => {
                setFilters({ status: "", search: "" });
                setCurrentPage(1);
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {loading ? (
            <div className="glass p-12 rounded-3xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="glass p-12 rounded-3xl text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">Create your first task to get started!</p>
              <button onClick={() => fetchTasks(1)} className="btn-primary">
                Refresh
              </button>
            </div>
          ) : (
            <>
              {tasks.map((task) => (
                <div key={task._id} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-1 truncate group-hover:no-underline">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Created {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task._id, e.target.value as Task["status"])}
                        className="px-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <span className={`status-badge status-${task.status}`}>
                        {task.status.replace("-", " ").toUpperCase()}
                      </span>
                      
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="btn-danger text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Pagination */}
          {pagination && (
            <div className="glass p-6 rounded-3xl flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} tasks
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 font-medium">
                  Page {pagination.page} of {pagination.pages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}