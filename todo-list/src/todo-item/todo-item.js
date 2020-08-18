import React, { useState } from 'react';
import styles from "./todo-item.module.css";

const TodoItem = (props) => {
    const [showDelete, toggleDelete] = useState(false);
    const show = () =>{
        toggleDelete(true);
    }    
    const hide = () =>{
        toggleDelete(false);
    }
    return (
        <div className={styles.todo} onMouseEnter={show} onMouseLeave={hide}>
            <p className={styles.content}>{props.content}</p>
            {showDelete ? <button className={styles.delete} onClick={props.remove}>Delete</button>: null}
        </div>
    );
}

export default TodoItem;