import React, { useState } from 'react';
import "./todo-item.css";

const TodoItem = (props) => {
    const [showDelete, toggleDelete] = useState(false);
    const show = () =>{
        toggleDelete(true);
    }    
    const hide = () =>{
        toggleDelete(false);
    }
    return (
        <div className="todo" onMouseEnter={show} onMouseLeave={hide}>
            <p>{props.content}</p>
            {showDelete ? <button className="test" onClick={props.remove}>Delete</button>: null}
        </div>
    );
}

export default TodoItem;