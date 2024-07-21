import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "../components/NavBar";
import EditTaskModal from "../components/EditTaskModal";
import ViewTaskModal from "../components/ViewTaskModal";
import CreateTaskModal from "../components/CreateTaskForm";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    "in-progress": [],
    done: [],
  });
  const base_URL = import.meta.env.VITE_API_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to login page
          return;
        }
        const res = await axios.get(`${base_URL}/api/tasks`, {
          headers: {
            "x-auth-token": token,
          },
        });
        const tasks = res.data.reduce(
          (acc, task) => {
            acc[task.status].push(task);
            return acc;
          },
          { todo: [], "in-progress": [], done: [] }
        );
        let fetchedTasks = res.data;
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

        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [searchTerm, sortBy]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    const movedTask = start[source.index];

    // Check if task is present and fetch necessary details
    if (!movedTask) {
      console.error("Task not found");
      return;
    }

    // Update task status in local state first
    if (start === finish) {
      const newTaskOrder = Array.from(start);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: newTaskOrder,
      }));
    } else {
      const startTaskOrder = Array.from(start);
      startTaskOrder.splice(source.index, 1);
      const finishTaskOrder = Array.from(finish);
      finishTaskOrder.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: startTaskOrder,
        [destination.droppableId]: finishTaskOrder,
      }));
    }

    // Update task status in the backend
    try {
      await axios.put(
        `${base_URL}/api/tasks/${draggableId}`,
        {
          ...movedTask, // Include all necessary fields
          status: destination.droppableId,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTask.status]: [...prevTasks[newTask.status], newTask],
    }));
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

      // setTasks((prevTasks) => {
      //   const currentStatus = prevTasks.currentStatus;

      //   // Check if currentStatus is a valid key in prevTasks
      //   if (currentStatus && prevTasks[currentStatus]) {
      //     return {
      //       ...prevTasks,
      //       [currentStatus]: prevTasks[currentStatus].map((task) =>
      //         task._id === taskId
      //           ? { ...task, title: newTitle, description: newDescription }
      //           : task
      //       ),
      //     };
      //   } else {
      //     console.error("Invalid currentStatus:", currentStatus);
      //     return prevTasks; // Return prevTasks unchanged if currentStatus is invalid
      //   }
      // });
      setTasks((prevTasks) => ({
        ...prevTasks,
        [prevTasks.currentStatus]: prevTasks[prevTasks.currentStatus].map(
          (task) =>
            task._id === taskId
              ? { ...task, title: newTitle, description: newDescription }
              : task
        ),
      })); // Update task in local state
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${base_URL}/api/tasks/${taskId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setTasks((prevTasks) => {
        console.log("Previous tasks before delete:", prevTasks);
        const updatedTasks = {
          ...prevTasks,
          [prevTasks.currentStatus]: prevTasks[prevTasks.currentStatus].filter(
            (task) => task._id !== taskId
          ),
        };
        console.log("Updated tasks after delete:", updatedTasks);
        return updatedTasks;
      });
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
        <h1 className="font-semibold text-2xl mb-5">Task Board</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-board mt-4 flex  border-gray-300 rounded-lg shadow-md p-4 space-x-4">
            {["todo", "in-progress", "done"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    className="task-column flex-1 bg-gray-100 rounded-lg p-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h3 className="text-lg text-white font-semibold mb-2 p-2 rounded-sm bg-blue-500">
                      {status.toUpperCase()}
                    </h3>
                    {tasks[status].map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-item bg-blue-100 border rounded p-2 mb-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskItem
                              task={task}
                              onEdit={handleEditClick}
                              onDelete={handleDeleteTask}
                              onViewDetails={handleViewDetailsClick}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
          {/* <TaskForm setTasks={setTasks} /> */}
        </DragDropContext>
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
      </div>
    </>
  );
};

export default TaskBoard;
