import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";
import {checkLocalStorage} from "../../localStorage";

const TodoItem = (props) => {
    //states
    const [buttonsShown, toggleButtons] = useState(false);
    const [todoComplete, completeTodo] = useState(checkLocalStorage(props.content, false));
    let status = null;
    //functions for toggling the buttons
    const show = () =>{
        toggleButtons(true);
    }    
    const hide = () =>{
        toggleButtons(false);
    }
    //Toggling the tick    
    const toggleTodo = () => {
        //toggle the todo to be incomplete
        if(todoComplete) {
            status = false;
            props.complete(status,props.index);
            completeTodo(status);
        }
        else {
            //toggle the todo to be complete
            status = true;
            props.complete(status,props.index);
            completeTodo(status);   
        }
        localStorage.setItem(props.content,status);
    }
    const checkTodoState = () => {
        if(todoComplete) return "☑";
        else return "☐";
    }

    let sprite = checkTodoState();
    //return the component
    return (
        <div className={styles.todo} onMouseOver={show} onMouseLeave={hide}>
            <p className={styles.todoContent} onClick={toggleTodo}>{props.content}</p>
            {buttonsShown ?         
            <Fragment>
                <button className={styles.delete} onClick={props.remove}>X</button>
                <button className={styles.edit}>edit</button>
            </Fragment> : null}
            <button className={styles.done} onClick={toggleTodo}>{sprite}</button>
        </div>
    );
}

export default TodoItem;