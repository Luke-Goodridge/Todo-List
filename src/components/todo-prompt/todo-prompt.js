import React, { Fragment } from "react";
import styles from "./todo-prompt.module.css";



export const Prompt = (props) => {


    const errorPrompt = (
        <div className={styles.promptModal}>
            <p>TEST ERROR</p>
            <button onClick={props.close}>OK</button>
        </div>
    )    
    const editPrompt = (
        <div className={styles.promptModal}>
            <textarea onChange={props.change}/>
            <button onClick={props.close}>OK</button>
        </div>
    )

    const mainPrompt = (
        <div className={styles.promptBackground}>
            {props.promptType === props.error ? errorPrompt : editPrompt}
        </div>
    );

    return (
        <Fragment>
            {props.promptShown ? mainPrompt : null}
        </Fragment>
    )
}

export default Prompt;