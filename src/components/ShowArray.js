import React from "react";
import TaskItem from "./TaskItem";

const ShowArray = ({tasks}) => {
    return (
        <div>
            {tasks.map((task) => (<div>
                <TaskItem task={task} key={task.id}/>
            </div>))}
        </div>
    )
}
export default ShowArray;
