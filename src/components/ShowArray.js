import React from "react";
import TaskItem from "./TaskItem";

const ShowArray = ({tasks, remove}) => {
    return (
        <div>
            {tasks.map((task) => (<div>
                <TaskItem remove={remove} task={task} key={task.id}/>
            </div>))}
        </div>
    )
}
export default ShowArray;
