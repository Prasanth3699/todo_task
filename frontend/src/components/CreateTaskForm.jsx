/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const CreateTaskModal = ({ isOpen, onClose, onCreate }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: newTaskTitle,
          description: newTaskDescription,

          // other task properties as needed
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      onCreate(response.data);
      setNewTaskTitle("");
      setNewTaskDescription("");
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Error creating task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl mb-4">Create New Task</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          required
          type="text"
          id="title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="m-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          required
          type="text"
          id="description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Enter task description"
          className="m-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          required
          type="date"
          id="title"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Enter task title"
          className="m-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="reminder"
          className="block text-sm font-medium text-gray-700"
        >
          Reminder
        </label>
        <input
          required
          type="date"
          id="reminder"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Enter task title"
          className="m-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTask}
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
