import React from 'react';
import styles from "./todo-new.module.css";
import { FaPlus } from "react-icons/fa";

const characterLimit = 280;

const NewTodo = (props) => {
    const todoInput = (
        <div className={styles.input}>
            <textarea
            maxLength={characterLimit}
            id="inputTodo" 
            onChange={props.inputHandler} 
            onKeyPress={props.return}/>
            <FaPlus className={styles.addBtn} onClick={props.addTodo}/>
        </div>
    );
    return (todoInput);
}

export default NewTodo;