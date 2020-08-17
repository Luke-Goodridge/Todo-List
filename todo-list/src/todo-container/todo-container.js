import React, { useState } from 'react';
import Todo from "../todo-item/todo-item";
import AddTodoButton from "../todo-add/todo-add";

const TodoContainer = () => {
    const [todoList, updateTodo] = useState([]);
    const [todoInput, updateInputTodo] = useState();

    const makeNewTodo = (newTodo) => {
        //checks the todo inputted to ensure its not "nothing"
        if(newTodo == null){
            alert("No value entered");            
        }
        //Else we add the todo to the todolist state.
        else {
            const newtodoList = [...todoList];
            newtodoList.push(newTodo);
            updateTodo(newtodoList);
        }
        //reset the input after a todo is added 
        document.getElementById("inputTodo").value = "";
        //update the input state
        updateInputTodo();
    }

    const removeTodo = (index) => {
        const newtodoList = [...todoList];
        newtodoList.splice(index,1);
        updateTodo(newtodoList);
    }

    const TodoInputHandler = (e) => {
        updateInputTodo(e.target.value);
    }

    //Method to listen for the enter key, if its pressed the todo is added
    const listenForEnterKey = (e) => {
        if(e.key === "Enter"){
            if(e.target.value !== ""){
                makeNewTodo(e.target.value);
            }
            else alert("No value entered");
        }
    }

    return (
        <div className="todo-container">
            {todoList.map((todo,index) => {
                return (
                <Todo 
                key={index} 
                content={(index+1) + ". " + todo} 
                remove={removeTodo.bind(this,index)}/>
                )
            })}
            <AddTodoButton 
            addTodo={makeNewTodo.bind(this,todoInput)}
            inputHandler={TodoInputHandler}
            return={listenForEnterKey}/>
        </div>
    );

}



export default TodoContainer;