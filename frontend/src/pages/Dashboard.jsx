import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setProfile(res.data);
    } catch (err) {
      setError("Failed to fetch profile");
      toast.error("Failed to fetch profile");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", { params: { search } });
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async (data) => {
    try {
      await API.post("/tasks", data);
      fetchTasks();
      toast.success("Task added successfully!");
    } catch (err) {
      setError("Failed to add task");
      toast.error("Failed to add task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (data) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, data);
      setEditingTask(null);
      fetchTasks();
      toast.success("Task updated successfully!");
    } catch (err) {
      setError("Failed to update task");
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (err) {
      setError("Failed to delete task");
      toast.error("Failed to delete task");
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
      toast.success(task.completed ? "Task marked incomplete!" : "Task completed!");
    } catch (err) {
      setError("Failed to update task status");
      toast.error("Failed to update task status");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 flex flex-col">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      {/* Header */}
      <header className="w-full bg-gray-900/70 backdrop-blur-md border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-transform hover:scale-105"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Profile & Task Form */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile */}
          {profile && (
            <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Profile</h2>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await API.put("/profile", {
                      name: e.target.name.value,
                      email: e.target.email.value,
                    });
                    setProfile(res.data);
                    toast.success("Profile updated successfully!");
                  } catch (err) {
                    setError("Failed to update profile");
                    toast.error("Failed to update profile");
                  }
                }}
              >
                <div>
                  <label className="block text-gray-400 text-sm">Username:</label>
                  <input
                    type="text"
                    value={profile.username}
                    disabled
                    className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm">Email:</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={profile.email}
                    className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm">Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={profile.name}
                    className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {/* Task Form */}
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">
              {editingTask ? "Edit Task" : "Add Task"}
            </h2>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              initial={editingTask || {}}
              submitLabel={editingTask ? "Update Task" : "Add Task"}
            />
            {editingTask && (
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg mt-4 w-full"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Right side - Search & Tasks */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Error */}
          {error && (
            <div className="text-red-400 p-4 bg-red-900/40 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 pl-10 border border-gray-600 rounded-full w-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>

          {/* Tasks */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-700 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Tasks</h2>
            {tasks.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No tasks found.</div>
            ) : (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className={`p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all ${
                      task.completed ? "bg-green-900/30" : "bg-gray-700/50"
                    }`}
                  >
                    <span className="flex-1 mb-2 sm:mb-0">
                      <strong
                        className={`block text-lg ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </strong>
                      <span className="text-sm text-gray-400">
                        {task.description}
                      </span>
                      {task.completed && (
                        <span className="ml-2 text-green-400 text-xs font-bold block sm:inline-block">
                          (Completed)
                        </span>
                      )}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-1 rounded-full text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-full text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleCompleteTask(task)}
                        className={`${
                          task.completed
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white font-semibold px-3 py-1 rounded-full text-sm`}
                      >
                        {task.completed ? "Mark Incomplete" : "Complete"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
