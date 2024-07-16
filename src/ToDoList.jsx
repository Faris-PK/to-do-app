import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: "Eat Breakfast", completed: false },
    { text: "Take a shower", completed: false },
    { text: "Walk the dog", completed: false }
  ]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");



  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditChange(event) {
    setEditText(event.target.value);
  }
  
  function addTask() {
    if (newTask.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }
   

    const taskExists = tasks.some(task => task.text.toLowerCase() === newTask.trim().toLowerCase());

    if (taskExists) {
      toast.error("Task already exists!");
    } else {
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask("");
      toast.success("Task added successfully!");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast.error("Task Deleted!");
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index]
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index]
      ];
      setTasks(updatedTasks);
    }
  }

  function completeTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    toast.info("Task status updated!");
  }
  function startEditTask(index) {
    setEditIndex(index);
    setEditText(tasks[index].text);
  }

  function saveEditTask(index) {
    if (editText.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }

    const taskExists = tasks.some((task, i) => i !== index && task.text.toLowerCase() === editText.trim().toLowerCase());

    if (taskExists) {
      toast.error("Task already exists!");
      return;
    }


    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
    toast.success("Task edited successfully!");
  }

  function cancelEditTask() {
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do-List</h1>
      <div>
        <input type="text"
          placeholder='Enter a task'
          value={newTask}
          onChange={handleInputChange} />
        <button className='add-button'
          onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button className='save-button' onClick={() => saveEditTask(index)}>Save</button>
                <button className='cancel-button' onClick={cancelEditTask}>Cancel</button>
              </>
            ) : (
              <>
                <span className={`text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                <button className='edit-button' onClick={() => startEditTask(index)}>Edit</button>
                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                <button className='move-button' onClick={() => moveTaskUp(index)}>👆</button>
                <button className='move-button' onClick={() => moveTaskDown(index)}>👇</button>
                <button className={`complete-button ${task.completed ? 'undo' : 'complete'}`} onClick={() => completeTask(index)}>
                  {task.completed ? 'Undo❌' : 'Done✅'}
                </button>
              </>
            )}
          </li>
        )}
      </ol>
      <ToastContainer />
    </div>
  )
}

export default ToDoList;
