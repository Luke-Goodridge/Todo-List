//react and functions
import React, { useState, useEffect } from 'react';
import {checkLocalStorage, localStore} from "../../localStorage";
//components
import Todo from "../todo-item/todo-item";
import ProgressBar from "../progress-bar/progress-bar";
import EnterNewTodo from "../todo-new/todo-new";
import TodoFilter from "../todo-filter/todo-filter";
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
        filterList: "filtered-list"
    }
    //Hooks
    const [todoList, updateMainTodos] = useState(checkLocalStorage(storage.list,defaultTodos));
    const [todoInput, updateInputTodo] = useState();
    const [filteredList, updateFilteredList] = useState(todoList);
    const [isFiltered, filterTodos] = useState(false);

    
    useEffect(() => {
        localStore(storage.filterList, filteredList);
        localStore(storage.list, todoList);
    }, [filteredList, todoList, storage])
    
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
            const newID = ID();
            const newFilteredList = [...filteredList];
            newFilteredList.push({text: newTodo, ID: newID, completed: false});
            updateFilteredList(newFilteredList);
            updateMainTodos([...todoList, {text: newTodo, ID: newID, completed: false}]);
            localStore(storage.list, [...todoList, {text: newTodo, ID: newID, completed: false}]);
        }
        //reset the input after a todo is added 
        document.getElementById("inputTodo").value = "";
        //update the input state to be blank by not passing a value
        updateInputTodo();
    }

    const removeTodo = (id) => {
        const newTodoList = [...todoList];
        const newFilteredList = [...filteredList];
        const todo = newFilteredList.find(todo => todo.ID === id);
        //check to see if the current todo is completed, if it is...
        //when removing we have to decrease the completed todos via toggleDone
        if(todo.completed) {
            //we only want to confirm them deleting if its completed
            let confirmed = window.confirm("Are you sure you wish to delete this todo?");
            if(!confirmed) return;
            toggleDone(false,id);
        }
        //we want to delete the todo from both the main and filtered todos.
        newTodoList.splice(newTodoList.indexOf(todo),1);
        newFilteredList.splice(newFilteredList.indexOf(todo),1);
        //update hooks
        updateFilteredList(newFilteredList);
        //keep the main todo list up to date
        updateMainTodos(newTodoList);
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
        //find the todo via looking for the ID
        const todo = newTodoList.find(todo => todo.ID === todo_ID);
        todo.completed = state;
        //Update the completed todo tracking variables/states
        if(state === true){
            //we need to update the filtered list to either show all the non completed, or show the full list
            if(isFiltered) updateFilteredList(newTodoList.filter(todo => !todo.completed));
            else updateFilteredList(newTodoList);
        }
        //keep the main todo list up to date
        updateMainTodos(newTodoList);
    }

    const todoFilter = (filter) => {
        let newFilteredList = [];
        if(!isFiltered){
            todoList.forEach(todo => {
                if(todo[filter] === false){
                    newFilteredList.push(todo);
                }
            });
        }   
        else {
            newFilteredList = [...todoList];
        }
        filterTodos(!isFiltered);
        updateFilteredList(newFilteredList);
}

    return (
        <div className={styles.container}>
            <TodoFilter click={todoFilter.bind(this, "completed")} isFiltered={isFiltered}/>
            <ProgressBar doneTodos={todoList.filter(todo => todo.completed).length} totalTodos={todoList.length}/>
            {filteredList.map((todo) => {
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
            {/* <ClearStorageBtn /> */}
        </div>
    );

}

export default TodoContainer;