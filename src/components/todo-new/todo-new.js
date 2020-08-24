import React from 'react';
import styles from "./todo-new.module.css";

const characterLimit = 280;

const NewTodo = (props) => {
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
    return (todoInput);
}

export default NewTodo;