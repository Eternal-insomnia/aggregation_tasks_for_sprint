import React, { useState } from "react";
import ShowArray from "./components/ShowArray";
import TaskForm from "./components/TaskForm";
import PostRequest from "./components/PostRequest";

function App() {
  const [tasks, setTasks] = useState([])

  const saveTask = () => {
    setTasks([...tasks])
  }

  const createTask = (NewTask) => {
    setTasks([...tasks, NewTask])
  }

  const removeTask = (task) => {
    setTasks(tasks.filter(t => t.id !== task.id))
  }

  return (
    <div className="App">
      <TaskForm save={saveTask} create={createTask}/>
      {tasks.length
      ? <ShowArray remove={removeTask} tasks={tasks}/>
      : <h1>Добавьте первую задачу</h1>
      }
      <PostRequest/>
    </div>
  );
}

export default App;
