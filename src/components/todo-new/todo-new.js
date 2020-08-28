import React from 'react';
import styles from "./todo-new.module.css";
import { FaPlus } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const characterLimit = 280;

const NewTodo = (props) => {
    const todoInput = (
        <div className={styles.input}>
            <textarea
            maxLength={characterLimit}
            id="inputTodo" 
            onChange={props.inputHandler} 
            onKeyPress={props.return}/>
            <FaPlus data-tip data-for="newTodoTooltip" className={styles.addBtn} onClick={props.addTodo}/>
            <ReactTooltip id="newTodoTooltip" type="light" place="top" effect="solid">
                Add new todo
            </ReactTooltip>
        </div>
    );
    return (todoInput);
}

export default NewTodo;