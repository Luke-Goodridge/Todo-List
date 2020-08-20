import React, { useState } from 'react';
import Todo from "../todo-item/todo-item";
import EnterNewTodo from "../todo-new/todo-new";
import styles from "./todo-container.module.css";

const TodoContainer = () => {
    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    //setup default values for the todo
    let defaultTodos = [
        {text: "Learn react hooks", ID: ID()},
        {text: "Watch a series on Netflix", ID: ID()},
        {text: "Import SASS into my project", ID: ID()},
        {text: "Add completed todos to the App", ID: ID()},
    ];

    //States
    const [todoList, updateTodo] = useState(defaultTodos);
    const [todoInput, updateInputTodo] = useState();
    const [completedTodos, updateCompletedTodos] = useState(0);

    const makeNewTodo = (newTodo) => {
        //checks the todo inputted to ensure its not "nothing"
        if(newTodo == null){
            alert("No value entered");            
        }
        //Else we add the todo to the todolist state.
        else {
            const newtodoList = [...todoList];
            newtodoList.push({text: newTodo, ID: ID(), completed: false});
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
        todoDone(false);
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
            //stop the default behaviour of enter
            e.preventDefault();
        }
    }   
    const todoDone = (isDone) => {
        //check if the todo is done, if so we increment the completed todos
        if(isDone){
            updateCompletedTodos(completedTodos+1)
        }
        //check for 0 as we dont want to go less than 0
        //sanity check isDone to ensure its in the right state
        else if(completedTodos > 0 & !isDone) {
            updateCompletedTodos(completedTodos-1);
        }

    }
    return (
        <div className={styles.container}>
            <div>{"Completed todos: "+ completedTodos+ "/"+ todoList.length}</div>
            {todoList.map((todo,index) => {
                return (
                <Todo 
                key={todo.ID}
                ID={todo.ID}
                content={todo.text}
                complete={todoDone}
                totalCompleted={updateCompletedTodos}
                remove={removeTodo.bind(this,index)}/>
                )
            })}
            <EnterNewTodo 
            addTodo={makeNewTodo.bind(this,todoInput)}
            inputHandler={TodoInputHandler}
            return={listenForEnterKey}/>
        </div>
    );

}

export default TodoContainer;