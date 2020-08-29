import Style from "./todo-filter.module.css";
import React from "react";


const TodoFilters = (props) => {
    return (
        <div>
            <button onClick={props.click}>Completed</button>
        </div>
    );
}

export default TodoFilters;