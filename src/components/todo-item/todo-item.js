import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";
import {FaCheckCircle, FaCircle, FaTrash} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const TodoItem = (props) => {
    //states
    const [buttonsShown, toggleButtons] = useState(false);

    //functions for toggling the buttons
    const show = () => toggleButtons(true); 
    const hide = () => toggleButtons(false);

    //Toggling the tick    
    const toggleTodo = () => {
        //use the toggle function to set the new completed value to be the opposite of what is is now.
        props.toggle(!props.isCompleted,props.id);
    }
    const checkTodoState = () => {
        if(props.isCompleted) return <FaCheckCircle className={styles.done} />;
        else return <FaCircle className={styles.notDone} />;
    }
    //variable to keep track of the shown icon
    let icon = checkTodoState();
    return (
        <div className={styles.todo} onMouseOver={show} onMouseLeave={hide}>
            <p className={styles.todoContent} onClick={toggleTodo}>{props.text}</p>
            {buttonsShown ?         
            <Fragment>
                <FaTrash data-tip data-for="deleteTooltip" className={styles.delete} onClick={props.remove}/>
                <ReactTooltip id="deleteTooltip" type="light" place="top" effect="solid">
                    Delete todo
                </ReactTooltip>
            </Fragment> : null}
            <span onClick={toggleTodo}>{icon}</span>

        </div>
    );
}

export default TodoItem;