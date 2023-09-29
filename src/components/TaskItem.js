import React from "react";

function TaskItem(props) {
    return(
        <div>
            <a>{props.task.body}</a>
        </div>
    )
}
export default TaskItem;
