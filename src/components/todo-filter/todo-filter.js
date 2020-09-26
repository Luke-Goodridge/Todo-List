import Style from "./todo-filter.module.css";
import React, { Fragment } from "react";
import { FaCaretRight, FaTimes } from "react-icons/fa";

const TodoFilters = (props) => {
  let filterString = (
    <Fragment>
      <FaCaretRight className={Style.green} />
      Filter completed
    </Fragment>
  );
  if (props.isFiltered) {
    filterString = (
      <Fragment>
        <FaTimes className={Style.red} />
        Clear filter
      </Fragment>
    );
  }
  return (
    <div className={Style.Filter}>
      <button className={Style.FilterBtn} onClick={props.click}>
        {filterString}
      </button>
    </div>
  );
};

export default TodoFilters;
