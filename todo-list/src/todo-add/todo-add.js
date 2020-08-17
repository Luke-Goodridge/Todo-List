import React from 'react';

const AddTodo = (props) => {
    return (
        <button onClick={props.addTodo}>Add new item</button>
    );
}

export default AddTodo;