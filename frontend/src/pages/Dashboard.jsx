/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import EditTaskModal from "../components/EditTaskModal";
import ViewTaskModal from "../components/ViewTaskModal";
import CreateTaskModal from "../components/CreateTaskForm";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const navigate = useNavigate();
  const userName = localStorage.getItem("UserName");
  const base_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, sortBy]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect to login page
        return;
      }
      const response = await axios.get(`${base_URL}/api/tasks`, {
        headers: {
          "x-auth-token": token,
        },
      });

      let fetchedTasks = response.data;

      // Filter tasks based on search term
      if (searchTerm) {
        fetchedTasks = fetchedTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort tasks based on sortBy input
      fetchedTasks.sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (taskId, newTitle, newDescription) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }
      await axios.put(
        `${base_URL}/api/tasks/${taskId}`,
        {
          title: newTitle,
          description: newDescription,
          status: "todo",
          // other task properties as needed
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === taskId
            ? { ...task, title: newTitle, description: newDescription }
            : task
        )
      ); // Update task in local state
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }
      await axios.delete(`${base_URL}/api/tasks/${taskId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove task from local state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleViewDetailsClick = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="font-semibold text-2xl mb-5 ">Dashboard</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="p-2 mb-3 font-semibold text-xl">
          Welcome: {userName}
        </div>
        <button
          onClick={handleCreateClick}
          className="text-white block w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Add New Task
        </button>

        <div className="card mt-4 border-gray-300 rounded-lg shadow-md p-4">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-1/6 m-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-1/6 m-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
          >
            <option value="createdAt">Sort by: Recent</option>
            <option value="title">Sort by: Title</option>
          </select>
        </div>

        <div className="mt-4 border-gray-300 rounded-lg shadow-md p-4">
          <div>
            <p className="text-lg text-white font-bold p-2 rounded-sm bg-blue-500">
              TODO
            </p>
          </div>
          <div className="mt-4 border-gray-300 rounded-lg">
            {tasks.map((task) => (
              <div key={task._id}>
                <TaskItem
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                  onViewDetails={handleViewDetailsClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateTask}
        task={currentTask}
      />
      <ViewTaskModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={currentTask}
      />
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </>
  );
};

export default Dashboard;
