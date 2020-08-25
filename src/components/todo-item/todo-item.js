import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";
import {checkLocalStorage} from "../../localStorage";
import {FaCheckCircle, FaCircle, FaTrash} from "react-icons/fa";

const TodoItem = (props) => {
    //states
    const [buttonsShown, toggleButtons] = useState(false);
    const [todoComplete, completeTodo] = useState(checkLocalStorage(props.content, false));
    //functions for toggling the buttons
    const show = () =>{
        toggleButtons(true);
    }    
    const hide = () =>{
        toggleButtons(false);
    }
    //Toggling the tick    
    const toggleTodo = () => {
        //Toggle using the todoComplete state.
        props.complete(!todoComplete,props.index);
        completeTodo(!todoComplete);
        localStorage.setItem(props.content,!todoComplete);
    }
    const checkTodoState = () => {
        //TODO - update these to sprites
        if(todoComplete) return <FaCheckCircle className={styles.done} />;
        else return <FaCircle className={styles.notDone} />;
    }

    let sprite = checkTodoState();
    //return the component
    return (
        <div className={styles.todo} onMouseOver={show} onMouseLeave={hide}>
            <p className={styles.todoContent} onClick={toggleTodo}>{props.content}</p>
            {buttonsShown ?         
            <Fragment>
                <FaTrash className={styles.delete} onClick={props.remove}/>
            </Fragment> : null}
            <span onClick={toggleTodo}>{sprite}</span>
        </div>
    );
}

export default TodoItem;