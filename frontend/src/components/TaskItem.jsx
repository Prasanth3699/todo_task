/* eslint-disable react/prop-types */
import React from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";

const TaskItem = ({ task, onEdit, onDelete, onViewDetails }) => {
  const handleReminderNotification = () => {
    if (task.reminder) {
      const reminderTime = new Date(task.reminder).getTime();
      const now = new Date().getTime();
      const timeout = reminderTime - now;

      if (timeout > 0) {
        setTimeout(() => {
          toast.info(`Reminder for task: ${task.title}`, {
            position: "top-right",
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, timeout);
      }
    }
  };

  React.useEffect(() => {
    handleReminderNotification();
  }, [task.reminder]);

  return (
    <div className="task-item bg-blue-100 bg-opacity-50 backdrop-blur-md z-10 border rounded p-2 mb-2 ">
      <div className="card">
        <p className="text-lg font-bold">{task.title}</p>
        <p className="text-m  text-gray-600">{task.description}</p>
        <p className="text-m mt-8 text-gray-600">
          {format(new Date(task.createdAt), "MMMM d, yyyy h:mm a")}
        </p>
        <div className="mt-6 flex space-x-4">
          {task.dueDate && (
            <p className="p-2 font-semibold text-gray-800">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
          {task.reminder && (
            <p className="p-2 font-semibold text-gray-800">
              Reminder: {new Date(task.reminder).toLocaleString()}
            </p>
          )}
        </div>
        <div className="mt-2 flex justify-end space-x-4">
          <button
            onClick={() => onDelete(task._id)}
            className="text-xs bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg button-sm mt-2"
          >
            Delete
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-xs bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-lg button-sm mt-2"
          >
            Edit
          </button>
          <button
            onClick={() => onViewDetails(task)}
            className="text-xs bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-lg button-sm mt-2"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
