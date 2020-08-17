import React from 'react';

const TodoItem = (props) => {
    return (
        <div className="todo">
            <p>{props.content}</p>
            <button>Remove</button>
        </div>
    );
}


export default TodoItem;