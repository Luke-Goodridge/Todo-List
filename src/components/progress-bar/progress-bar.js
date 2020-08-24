import React from "react";
import style from "./progress-bar.module.css";

const ProgressBar = (props) => {
    //show this text if you havent completed
    let todosLeftText = props.doneTodos + "/" + props.totalTodos + " completed.";
    const completedText = "Well done, you've completed all your tasks!";
    if(props.totalTodos <= 0) todosLeftText = <p>Start adding some tasks!</p>;
    //get the current state of progress
    let todoProgress = (props.doneTodos / props.totalTodos) * 100 + "%";
    //check if the there are no Todos, we dont want to fill the bar green
    if(props.totalTodos === 0) todoProgress = "0%";
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
            {props.totalTodos <= 0 ? todosLeftText : 
                <p>Progress - {todoProgress === "100%" ? completedText : todosLeftText}</p>}
            <div className={style.barBackground}>
                <div style={BarStyle}></div>
            </div>
        </div>

    );
}
export default ProgressBar;