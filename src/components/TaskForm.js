import React, { useState } from "react";

const TaskForm = ({create}) => {
      const [num_employers, setNumEmployers] = useState(0)
      const [body, setBody] = useState('')

      function AddNewRow(e) {
        e.preventDefault()
        const NewTask = {
            id: Date.now(), 
            num_employers,
             body
        }
        create(NewTask)
        setBody('')
      }
    
    return (
        <div>
            <form>
            <input
            value={num_employers}
            onChange={el => setNumEmployers(el.target.value)}
            type="number" 
            placeholder="Количество сотрудников"
            />
            <input
            value={body}
            onChange={el => setBody(el.target.value)}
            type="text"     
            placeholder="Задача"
            />
            <button onClick={AddNewRow}>Добавить задачу</button>
        </form>
        </div>
    )
}
export default TaskForm;
