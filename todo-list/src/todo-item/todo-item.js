import React from 'react';

const TodoItem = (props) => {
    return (
        <div className="todo">
            <p>{props.content}</p>
            <button onClick={props.remove}>Remove</button>
        </div>
    );
}


export default TodoItem;