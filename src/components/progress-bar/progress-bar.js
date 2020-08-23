import React from "react";
import style from "./progress-bar.module.css";

const ProgressBar = (props) => {
    //show this text if you havent completed
    let todosLeftText = "- Only " + (props.totalTodos - props.doneTodos) + " tasks left.";
    const completedText = "- Well done, you've completed all your todos!";
    //get the current state of progress
    let todoProgress = props.progress + "%";
    //styles which updates the bar's width with the state of props.progress
    let BarStyle = {
        backgroundColor : "green",
        transition : ".5s",
        textAlign : "center",
        borderRadius : "5rem",
        width : todoProgress,
        height : "100%",
    }
    return(
        <div className={style.barContainer}>
            <p>Progress {todoProgress === "100%" ? completedText : todosLeftText}</p>
            <div className={style.barBackground}>
                <div style={BarStyle}></div>
            </div>
        </div>

    );
}
export default ProgressBar;