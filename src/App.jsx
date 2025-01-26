import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const initialLists = [
  { id: "todo", title: "To Do", icon: todoIcon },
  { id: "doing", title: "In Progress", icon: doingIcon },
  { id: "done", title: "Done", icon: doneIcon },
];

const App = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  // Load tasks only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    }
  }, [isAuthenticated]);

  // Save tasks only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isAuthenticated]);

  // Add new task function
  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  // Delete task function
  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Drag and drop handlers
  const onDrop = (listId, position) => {
    if (!activeCard) return;

    setTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.id === activeCard);
      const filteredTasks = prevTasks.filter(task => task.id !== activeCard);
      const updatedTask = { ...taskToMove, listId };
      
      return [
        ...filteredTasks.slice(0, position),
        updatedTask,
        ...filteredTasks.slice(position)
      ];
    });
    
    setActiveCard(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setActiveCard(null);
  };

  // Authentication buttons component
  const AuthButtons = () => (
    <div className="auth-buttons">
      {!isAuthenticated ? (
        <>
          <button 
            onClick={() => loginWithRedirect()}
            className="auth-button"
          >
            Log In
          </button>
          <button
            onClick={() => loginWithRedirect({ screen_hint: "signup" })}
            className="auth-button"
          >
            Sign Up
          </button>
        </>
      ) : (
        <div className="user-info">
          {user?.picture && (
            <img src={user.picture} alt={user.name} className="user-avatar" />
          )}
          <span>Welcome, {user?.name || 'User'}</span>
          <button 
            onClick={() => logout({ returnTo: window.location.origin })}
            className="auth-button"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <AuthButtons />
      </header>

      {isAuthenticated ? (
        <>
          <TaskForm addTask={addTask} lists={initialLists} />
          <main className="app_main">
            {initialLists.map((list) => (
              <TaskColumn
                key={list.id}
                listId={list.id}
                title={list.title}
                icon={list.icon}
                tasks={tasks.filter((task) => task.listId === list.id)}
                handleDelete={handleDelete}
                setActiveCard={setActiveCard}
                onDrop={onDrop}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
              />
            ))}
          </main>
        </>
      ) : (
        <div className="login-prompt">
          <h2>Please log in to access your Kanban board</h2>
        </div>
      )}
    </div>
  );
};

export default App;


// frontend code only without use of auth0

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { useAuth0 } from "@auth0/auth0-react";
// import TaskForm from "./components/TaskForm";
// import TaskColumn from "./components/TaskColumn";
// import todoIcon from "./assets/direct-hit.png";
// import doingIcon from "./assets/glowing-star.png";
// import doneIcon from "./assets/check-mark-button.png";

// const initialLists = [
//   { id: "todo", title: "To Do", icon: todoIcon },
//   { id: "doing", title: "In Progress", icon: doingIcon },
//   { id: "done", title: "Done", icon: doneIcon },
// ];

// const App = () => {
//   const [lists, setLists] = useState(initialLists);
//   const [tasks, setTasks] = useState([]);
//   const [activeCard, setActiveCard] = useState(null);

//   // Load tasks from local storage on initial render
//   useEffect(() => {
//     const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     setTasks(savedTasks);
//   }, []);

//   // Save tasks to local storage whenever tasks change
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const addTask = (task) => {
//     setTasks([...tasks, task]);
//   };

//   // Delete a task
//   const handleDelete = (taskId) => {
//     const updatedTasks = tasks.filter((task) => task.id !== taskId);
//     setTasks(updatedTasks);
//   };

//   // Handle drag-and-drop
//   const onDrop = (listId, position) => {
//     if (activeCard === null || activeCard === undefined) return;

//     const taskToMove = tasks.find((task) => task.id === activeCard);
//     const updatedTasks = tasks.filter((task) => task.id !== activeCard);

//     // Insert the task at the correct position in the new list
//     updatedTasks.splice(position, 0, {
//       ...taskToMove,
//       listId: listId,
//     });

//     setTasks(updatedTasks);
//     setActiveCard(null); // Reset active card after dropping
//   };

//   // Handle drag over event
//   const handleDragOver = (e) => {
//     e.preventDefault(); // Allow dropping
//   };

//   // Handle drag end event
//   const handleDragEnd = () => {
//     setActiveCard(null); // Reset active card after dragging ends
//   };

//   return (
//     <div className="app">
//       <TaskForm addTask={addTask} lists={lists} />
//       <main className="app_main">
//         {lists.map((list) => (
//           <TaskColumn
//             key={list.id}
//             listId={list.id}
//             title={list.title}
//             icon={list.icon}
//             tasks={tasks.filter((task) => task.listId === list.id)}
//             handleDelete={handleDelete}
//             setActiveCard={setActiveCard}
//             onDrop={onDrop}
//             handleDragOver={handleDragOver}
//             handleDragEnd={handleDragEnd}
//           />
//         ))}
//       </main>
    
//     </div>
//   );
// };

// export default App; 