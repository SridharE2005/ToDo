import { useState, useEffect } from "react";
import "./ToDo.css";

function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks explicitly when the component mounts
  const loadTasks = () => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (Array.isArray(storedTasks)) {
        setTasks(storedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      setTasks([]);
    }
  };

  // Save tasks explicitly whenever tasks array changes
  const saveTasks = (updatedTasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  };

  // Add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      saveTasks(updatedTasks); // Explicit save
      setTask("");
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Explicit save
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
