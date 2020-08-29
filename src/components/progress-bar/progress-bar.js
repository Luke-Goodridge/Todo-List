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

    let barStyles = [
        {backgroundColor : "#88BBB0",width : "40%",zIndex : "2",}, //Done
        {backgroundColor : "yellow",width : "80%",zIndex : "1",}, //In progress
        {backgroundColor : "red",width : "100%",zIndex : "0",}, //incomplete
    ];
    
    return(
        <div className={style.barContainer}>
            {props.totalTodos <= 0 ? todosLeftText : 
                <p>Progress - {todoProgress === "100%" ? completedText : todosLeftText}</p>}
            <div className={style.barBackground}>
                <div className={style.bar} style={barStyles[0]}></div>
                <div className={style.bar} style={barStyles[1]}></div>
                <div className={style.bar} style={barStyles[2]}></div>
            </div>
        </div>

    );
}
export default ProgressBar;