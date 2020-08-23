//react and functions
import React, { useState } from 'react';
import {checkLocalStorage, localStore} from "../../localStorage";
//components
import Todo from "../todo-item/todo-item";
import ProgressBar from "../progress-bar/progress-bar";
import EnterNewTodo from "../todo-new/todo-new";
//Style modules
import styles from "./todo-main.module.css";

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
    //object to keep all variables for local storage keys
    const storage = {
        list: "todo-list",
        completed: "total-completed"
    }
    //Hooks
    const [todoList, updateTodo] = useState(checkLocalStorage(storage.list,defaultTodos));
    const [todoInput, updateInputTodo] = useState();
    const [completedTodos, updateCompletedTodos] = useState(checkLocalStorage(storage.completed,0));
    const [progress, updateProgress] = useState((completedTodos / todoList.length) * 100);

    const makeNewTodo = (newTodo) => {
        //checks the todo inputted to ensure its not "nothing"
        if(newTodo == null){
            alert("No value entered");            
        }
        //check if the todo already exists
        if(todoList.some(todo => todo.text.toLowerCase() === newTodo.toLowerCase())){
            alert("You have already added that!");  
        }
        //Else we add the todo to the todolist state.
        else {
            const newtodoList = [...todoList];
            newtodoList.push({text: newTodo, ID: ID(), completed: false});
            updateTodo(newtodoList);
            localStore(storage.list, newtodoList);
        }
        //reset the input after a todo is added 
        document.getElementById("inputTodo").value = "";
        //update the input state to be blank by not passing a value
        updateInputTodo();
        updateProgress((completedTodos / todoList.length) * 100);
    }

    const removeTodo = (index) => {
        const text = todoList[index].text;
        console.log(text);
        const newtodoList = [...todoList];
        newtodoList.splice(index,1);
        updateTodo(newtodoList);
        todoDone(false);
        localStorage.removeItem(text);
        localStore(storage.list, newtodoList);
        
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
        let newTodoCount;
        //check if the todo is done, if so we increment the completed todos
        if(isDone){
            newTodoCount = completedTodos + 1;
            updateCompletedTodos(newTodoCount)
            localStore(storage.completed, newTodoCount);
        }
        //check for 0 as we dont want to go less than 0
        //sanity check isDone to ensure its in the right state
        else if(completedTodos > 0 & !isDone) {
            newTodoCount = completedTodos - 1;
            updateCompletedTodos(newTodoCount); 
            localStore(storage.completed, newTodoCount);
        }

        updateProgress((newTodoCount / todoList.length) * 100);    
    }
    return (
        <div className={styles.container}>
            <ProgressBar doneTodos={completedTodos} totalTodos={todoList.length} progress={progress}/>
            {todoList.map((todo,index) => {
                return (
                <Todo 
                key={todo.ID}
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