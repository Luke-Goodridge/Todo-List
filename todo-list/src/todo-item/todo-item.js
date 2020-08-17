import React, { useState } from 'react';

const TodoItem = (props) => {
    const [showDelete, toggleDelete] = useState(false);
    const updateState = () =>{
        toggleDelete(!showDelete);
    }
    return (
        <div className="todo">
            <p onMouseEnter={updateState}>{props.content}</p>
            <button onClick={props.remove}>Remove</button>
            {showDelete ? <p>Test</p>: <p>Test2</p>}
        </div>
    );
}

export default TodoItem;