import React from "react";

function TaskItem(props) {
    return(
        <div>
            <button onClick={() => props.remove(props.task)}>удалить</button>
            <div>
                <h3>{props.task.body}</h3>
                <h3>{props.task.days}</h3>
                <h3>{props.task.priority}</h3>
            </div>
                      
        </div>
    )
}
export default TaskItem;
