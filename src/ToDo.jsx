import { useState, useEffect } from "react";
import "./ToDo.css";

function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [calculatedRating, setCalculatedRating] = useState(0);

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
        wrong: false,
        rating: 0,
        showOptions: false, // to handle the visibility of the options
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
      i === index
        ? { ...t, completed: !t.completed, wrong: false } // Uncheck wrong when completed
        : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Mark task as incorrect
  const markWrong = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index
        ? { ...t, wrong: !t.wrong, completed: false } // Uncheck completed when marked wrong
        : t
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

  // Toggle the visibility of Edit and Delete buttons
  const toggleOptions = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, showOptions: !t.showOptions } : t
    );
    setTasks(updatedTasks);
  };

  // Calculate overall rating
  const calculateOverallRating = () => {
    const totalRating = tasks.reduce((acc, task) => acc + task.rating, 0);
    const ratedTasks = tasks.filter((task) => task.rating > 0).length;
    const averageRating = ratedTasks > 0 ? totalRating / ratedTasks : 0;
    setCalculatedRating(averageRating.toFixed(2));
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
          <li key={index} className="task">
            <div className="task-text">
              {t.completed && <span className="correct-symbol">✔</span>}
              {t.wrong && <span className="wrong-symbol">✘</span>}
              <span>{t.text}</span>
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompletion(index)}
              />
              <input
                type="checkbox"
                checked={t.wrong}
                onChange={() => markWrong(index)}
              />
              {t.completed && (
                <select
                  value={t.rating}
                  onChange={(e) =>
                    updateRating(index, parseInt(e.target.value))
                  }
                >
                  <option value="0">Rate</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} ⭐
                    </option>
                  ))}
                </select>
              )}
              <button onClick={() => toggleOptions(index)}>...</button>
              {t.showOptions && (
                <div className="action-buttons">
                  <button onClick={() => editTask(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="calculate-button" onClick={calculateOverallRating}>
        Calculate Rating
      </button>
      {calculatedRating > 0 && (
        <div className="calculated-rating">Overall Rating: {calculatedRating}</div>
      )}
    </div>
  );
}

export default ToDo;
