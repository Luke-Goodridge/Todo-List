import React, { useState, Fragment } from 'react';
import styles from "./todo-item.module.css";

const TodoItem = (props) => {
    const [buttonsShown, toggleButtons] = useState(false);

    //functions for toggling the buttons
    const show = () =>{
        toggleButtons(true);
    }    
    const hide = () =>{
        toggleButtons(false);
    }
    //return the component
    return (
        <div className={styles.todo} onMouseEnter={show} onMouseLeave={hide}>
            <p className={styles.content}>{props.content}</p>
            {buttonsShown ?         
            <Fragment>
                <button className={styles.delete} onClick={props.remove}>X</button>
                <button className={styles.edit}>edit</button>
            </Fragment> : null}
            <button className={styles.done}>X</button>
        </div>
    );
}

export default TodoItem;