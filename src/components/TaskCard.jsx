import React from "react";
import "./TaskCard.css";

const TaskCard = ({
  task,
  handleDelete,
  setActiveCard,
  handleDragOver,
  handleDragEnd,
}) => {
  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(task.id)}
      onDragOver={(e) => {
        e.preventDefault(); // Prevent default behavior
        handleDragOver(e);
      }}
      onDragEnd={handleDragEnd}
    >
      <p className="task_text">{task.title}</p>
      <p className="task_description">{task.description}</p>
      <p className="task_due_date">Due: {task.dueDate}</p>
      <p className="task_priority">Priority: {task.priority}</p>
      <div className="task_card_bottom_line">
        <div className="task_delete" onClick={() => handleDelete(task.id)}>
          🗑️
        </div>
      </div>
    </article>
  );
};

export default TaskCard;