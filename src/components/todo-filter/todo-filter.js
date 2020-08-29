import Style from "./todo-filter.module.css";
import React from "react";


const TodoFilters = (props) => {
    let filterString = "Filter by not completed";
    if(props.isFiltered) filterString = "Un-filter todos"
    return (
        <div className={Style.Filter}>
            <button onClick={props.click}>{filterString}</button>
        </div>
    );
}

export default TodoFilters;