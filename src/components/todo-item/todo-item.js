import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";

const TodoItem = (props) => {
    const readLocalStorage = () => {
        
        if(localStorage.getItem(props.content) != null){
            //we have to convert the json storage back to a bool
            const isDone = JSON.parse(localStorage.getItem(props.content));
            //if its true, we will want to update the completed todos
            //TODO
            return isDone;
        }
        else return false;
    }

    //states
    const [buttonsShown, toggleButtons] = useState(false);
    const [todoComplete, completeTodo] = useState(readLocalStorage());

    //functions for toggling the buttons
    const show = () =>{
        toggleButtons(true);
    }    
    const hide = () =>{
        toggleButtons(false);
    }
    //Toggling the tick    
    const toggleTodo = () => {
        let status = null;
        if(todoComplete) {
            status = false;
            props.complete(status);
            completeTodo(status);
        }
        else {
            status = true;
            props.complete(status);
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