import { useState, useEffect } from "react";
import "./ToDo.css";

function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
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

  // Save tasks to localStorage
  const saveTasks = (updatedTasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        text: task,
        completed: false,
        rating: 0,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTask("");
    }
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Update task rating
  const updateRating = (index, rating) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, rating } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index) => {
    const updatedTaskText = prompt("Edit your task:", tasks[index].text);
    if (updatedTaskText !== null && updatedTaskText.trim() !== "") {
      const updatedTasks = tasks.map((t, i) =>
        i === index ? { ...t, text: updatedTaskText } : t
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

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
          <li key={index} className={`task ${t.completed ? "completed" : ""}`}>
            <span>{t.text}</span>
            <div className="task-actions">
              <button onClick={() => toggleCompletion(index)}>✔</button>
              {/* Conditionally render the rating selection */}
              {t.completed && (
                <select
                  value={t.rating}
                  onChange={(e) => updateRating(index, parseInt(e.target.value))}
                >
                  <option value="0">Rate</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} ⭐
                    </option>
                  ))}
                </select>
              )}
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
