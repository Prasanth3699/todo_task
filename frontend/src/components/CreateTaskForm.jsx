/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const CreateTaskModal = ({ isOpen, onClose, onCreate }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newDueDate, newSetDueDate] = useState("");
  const [newReminder, newSetReminder] = useState("");
  const [error, setError] = useState("");
  const base_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }
      const response = await axios.post(
        `${base_URL}/api/tasks`,
        {
          title: newTaskTitle,
          description: newTaskDescription,
          dueDate: newDueDate,
          reminder: newReminder,
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
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
          htmlFor="due"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          required
          type="date"
          id="due"
          value={newDueDate}
          onChange={(e) => newSetDueDate(e.target.value)}
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
          value={newReminder}
          onChange={(e) => newSetReminder(e.target.value)}
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
