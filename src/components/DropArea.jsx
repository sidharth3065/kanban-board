import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop, listId, position }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div>
      <section
        onDragEnter={() => setShowDrop(true)}
        onDragLeave={() => setShowDrop(false)}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(listId, position); // Pass listId and position to the parent
          setShowDrop(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        className={showDrop ? "drop_area" : "hide_drop"}
      >
        Drop Here
      </section>
    </div>
  );
};

export default DropArea;