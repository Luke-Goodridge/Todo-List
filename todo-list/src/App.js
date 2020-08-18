import React, { Component } from 'react';
import './App.css';
import TodoList from "./todo-container/todo-container";

class App extends Component {
  render(){
    return(
      <div className="App">
        <h1>Todo App</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;
