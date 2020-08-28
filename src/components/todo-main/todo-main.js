//react and functions
import React, { useState, useEffect } from 'react';
import {checkLocalStorage, localStore} from "../../localStorage";
//components
import Todo from "../todo-item/todo-item";
import ProgressBar from "../progress-bar/progress-bar";
import EnterNewTodo from "../todo-new/todo-new";
//Test button to clear storage
import ClearStorageBtn from "../test-clear-storage/clear-storage";
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
    const defaultTodos = [
        {text: "Learn react hooks", ID: ID(), completed: false},
        {text: "Watch a series on Netflix", ID: ID(), completed: false},
        {text: "Import SASS into my project", ID: ID(), completed: false},
        {text: "Add completed todos to the App", ID: ID(), completed: false},
        {text: "Make dinner for family", ID: ID(), completed: false},
        {text: "Make a full stack web app", ID: ID(), completed: false},
    ];
    //object to keep all variables for local storage keys
    const storage = {
        list: "todo-list",
        completed: "completed-list",
    }
    //Hooks
    const [todoList, updateTodoList] = useState(checkLocalStorage(storage.list,defaultTodos));
    const [todoInput, updateInputTodo] = useState();
    const [completedList, updateCompletedList] = useState(checkLocalStorage(storage.completed,[]));

    useEffect(() => {
        console.log("App was re-rendered");
    }, [todoList])
    
    const makeNewTodo = (newTodo) => {
        const todoLimit = 9;
        //checks the todo inputted to ensure its not "nothing"
        if(newTodo == null || newTodo === undefined || newTodo.trim() === ""){
            alert("That doesnt look like a valid task.");           
        }
        //check if the todo already exists
        else if(todoList.some(todo => todo.text.toLowerCase() === newTodo.toLowerCase())){
            alert("That task already exists.");  
        }
        //we are keeping todos a max of 9 for now.
        else if(todoList.length >= todoLimit) {
            alert("That's alot of tasks, try to finish and remove those first before adding more.");
        }
        //Else we add the todo to the todolist state.
        else {
            const newTodoList = [...todoList];
            newTodoList.push({text: newTodo, ID: ID(), completed: false});
            updateTodoList(newTodoList);
            localStore(storage.list, newTodoList);
        }
        //reset the input after a todo is added 
        document.getElementById("inputTodo").value = "";
        //update the input state to be blank by not passing a value
        updateInputTodo();
    }

    const removeTodo = (id) => {
        const newTodoList = [...todoList];
        let newCompletedList = [...completedList];
        const todo = newTodoList.find(todo => todo.ID === id);
        console.log(todo);
        //check to see if the current todo is completed, if it is...
        //when removing we have to decrease the completed todos via toggleDone
        if(todo.completed) {
            //we only want to confirm them deleting if its completed
            let confirmed = window.confirm("Are you sure you wish to delete this todo?");
            if(!confirmed) return;
            toggleDone(false,id);
            newCompletedList = newTodoList.filter(todo => todo.completed);
        }
        newTodoList.splice(newTodoList.indexOf(todo),1);
        updateCompletedList(newCompletedList);
        updateTodoList(newTodoList);
        localStore(storage.list, newTodoList);
        localStore(storage.completed, newCompletedList);
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
            else alert("That doesnt look like a valid task.");
            //stop the default behaviour of enter
            e.preventDefault();
        }
    }   
    const toggleDone = (state, todo_ID) => {
        const newTodoList = [...todoList];
        let newCompletedList = [...completedList];
        //find the todo via looking for the ID
        const todo = newTodoList.find(todo => todo.ID === todo_ID);
        todo.completed = state;
        //Update the completed todo tracking variables/states
        if(state === true){
            newCompletedList.push(todo)
        }
        else {
            newCompletedList = newTodoList.filter(todo => todo.completed);
        }
        //update state and local storage
        updateTodoList(newTodoList);
        localStore(storage.list, newTodoList);
        updateCompletedList(newCompletedList);
        localStore(storage.completed, newCompletedList);
    }

    return (
        <div className={styles.container}>
            <ProgressBar doneTodos={completedList.length} totalTodos={todoList.length}/>
            {todoList.map((todo) => {
                return (
                    <Todo 
                    key={todo.ID}
                    id={todo.ID}
                    text={todo.text}
                    isCompleted={todo.completed}
                    toggle={toggleDone}
                    remove={removeTodo.bind(this,todo.ID)}/>
                )
            })}
            <EnterNewTodo 
            addTodo={makeNewTodo.bind(this,todoInput)}
            inputHandler={TodoInputHandler}
            return={listenForEnterKey}/>
            <ClearStorageBtn />
        </div>
    );

}

export default TodoContainer;