import React, { useState } from 'react';
import Todo from "../todo-item/todo-item";
import AddTodoButton from "../todo-add/todo-add";

const TodoContainer = (props) => {
    let [todoList, setList] = useState(["test3","test","test3","test3","test"]);

    const MakeNewTodo = () => {
        console.log("Todo added")
        const newtodoList = [...todoList];
        newtodoList.push("New");
        setList(newtodoList);
        console.log(todoList);
    }

    return (
        <div className="todo-container">
            {todoList.map((todo,index) => {
                return <Todo key={index} content={todo} />
            })}
            <AddTodoButton addTodo={MakeNewTodo} />
        </div>
    );

}



export default TodoContainer;