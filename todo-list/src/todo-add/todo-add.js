import React, { useState, Fragment } from 'react';
import "./todo-add.css";

const characterLimit = 280;

const AddTodo = (props) => {
    const [showInput, toggleInput] = useState(false);

    const todoInput = (
        <div className="todoInput">
            <textarea
            maxLength={characterLimit}
            id="inputTodo" 
            onChange={props.inputHandler} 
            onKeyPress={props.return}/>
            <button id="addTodoBtn" onClick={props.addTodo}>Add new item</button>
        </div>
    );

    const todoShowInput = (
        <button onClick={() => toggleInput(true)}>Add Todo BTN</button>
    )
    return (
        <Fragment>
            {showInput ? todoInput : todoShowInput}
        </Fragment>
    );
}



export default AddTodo;