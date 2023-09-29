import React, { useState } from "react";
import ShowArray from "./components/ShowArray";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, body: 'Программист'},
    {id: 2, body: 'Говноед'}
  ])

  const createTask = (NewTask) => {
    setTasks([...tasks, NewTask])
  }

  return (
    <div className="App">
      <TaskForm create={createTask}/>
      <ShowArray tasks={tasks}/>
    </div>
  );
}

export default App;
