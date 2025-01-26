import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
  listId,
  title,
  icon,
  tasks,
  handleDelete,
  setActiveCard,
  onDrop,
  handleDragOver,
  handleDragEnd,
}) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt="" /> {title}
      </h2>

      {/* DropArea at the top of the column */}
      <DropArea onDrop={onDrop} listId={listId} position={0} />

      {/* Render tasks and DropArea between tasks */}
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <TaskCard
            task={task}
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
          />
          <DropArea onDrop={onDrop} listId={listId} position={index + 1} />
        </React.Fragment>
      ))}
    </section>
  );
};

export default TaskColumn;