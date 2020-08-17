import React from 'react';

const characterLimit = 280;

const AddTodo = (props) => {
    return (
        <div>
            <input
            maxLength={characterLimit}
            id="inputTodo" 
            onChange={props.inputHandler} 
            onKeyPress={props.return}/>
            <button onClick={props.addTodo}>Add new item</button>
        </div>
    );
}



export default AddTodo;