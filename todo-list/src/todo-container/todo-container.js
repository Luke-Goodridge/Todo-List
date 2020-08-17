import React from 'react';
import Todo from "../todo-item/todo-item";

const TodoContainer = (props) => {
    return (
        <div className="todo-container">
            {props.list.map((todo,index) => {
                return <Todo content={todo} />
            })}
        </div>
    );
}


export default TodoContainer;