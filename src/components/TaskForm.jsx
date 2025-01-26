import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask, lists }) => {
  const [taskData, setTaskData] = useState({
    id: Date.now(),
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    listId: lists[0].id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return; // Prevent empty tasks
    addTask(taskData);
    setTaskData({
      id: Date.now(),
      title: "",
      description: "",
      dueDate: "",
      priority: "low",
      listId: lists[0].id,
    });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          className="task_input"
          placeholder="Enter task title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={taskData.description}
          className="task_input"
          placeholder="Enter task description"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          className="task_input"
          onChange={handleChange}
        />
        <select
          name="priority"
          value={taskData.priority}
          className="task_input"
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="listId"
          value={taskData.listId}
          className="task_input"
          onChange={handleChange}
        >
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </select>
        <button type="submit" className="task_submit">
          + Add Task
        </button>
      </form>
    </header>
  );
};

export default TaskForm;