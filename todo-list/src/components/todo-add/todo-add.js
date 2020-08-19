import React, { useState, Fragment } from 'react';
import styles from "./todo-add.module.css";

const characterLimit = 280;

const AddTodo = (props) => {
    const [showInput, toggleInput] = useState(false);
    const todoInput = (
        <div className={styles.input}>
            <textarea
            maxLength={characterLimit}
            id="inputTodo" 
            onChange={props.inputHandler} 
            onKeyPress={props.return}/>
            <button id={styles.addBtn} onClick={props.addTodo}>Add</button>
        </div>
    );

    const todoShowInput = (
        <button onClick={() => toggleInput(true)}>Write a Todo</button>
    )
    return (
        // fragment is a good substitute for elements being held in a div
        <Fragment>
            {showInput ? todoInput : todoShowInput}
        </Fragment>
    );
}



export default AddTodo;