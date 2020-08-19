import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";

const TodoItem = (props) => {
    const [buttonsShown, toggleButtons] = useState(false);
    const [todoComplete, completeTodo] = useState(false);

    //functions for toggling the buttons
    const show = () =>{
        toggleButtons(true);
    }    
    const hide = () =>{
        toggleButtons(false);
    }
    //Toggling the tick    
    const setTodo = () => {
        completeTodo(!todoComplete);
    }
    //return the component
    return (
        <div className={styles.todo} onMouseOver={show} onMouseLeave={hide}>
            <p className={styles.content}>{props.content}</p>
            {buttonsShown ?         
            <Fragment>
                <button className={styles.delete} onClick={props.remove}>X</button>
                <button className={styles.edit}>edit</button>
            </Fragment> : null}
            <button className={styles.done} onClick={setTodo}>{todoComplete.toString()}</button>
        </div>
    );
}

export default TodoItem;