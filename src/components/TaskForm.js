import React, { useState } from "react";

const TaskForm = ({create, save}) => {
      const [num_employers, setNumEmployers] = useState(0)
      const [body, setBody] = useState('')
      const [days, setDays] = useState(0)
      const [priority, setPriority] = useState(1)

      function AddNewRow(e) {
        e.preventDefault()
        const NewTask = {
            id: Date.now(), 
            body,
            days,
            priority
        }
        create(NewTask)
        setBody('') 
        setDays(0)
        setPriority(1)
      }

    function IfEmpty(e) {
      e.preventDefault()
        save()
      setBody('')
      setDays(0)
      setPriority(1)
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
            <input
            value={days}
            onChange={el => setDays(el.target.value)}
            type="number"     
            placeholder="Кол-во дней"
            />
            <select value={priority} onChange={el => setPriority(el.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button onClick={body!=='' && days !== 0 ? AddNewRow : IfEmpty}>Добавить задачу</button>
        </form>
        </div>
    )
}
export default TaskForm;

