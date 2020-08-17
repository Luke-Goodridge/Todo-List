import React, { Component } from 'react';
import './App.css';
import TodoList from "./todo-container/todo-container";

class App extends Component {
  state = {
    list : ["Test0","Test1","Test2","Test3"],
  };
  render(){
    return(
      <div className="App">
        <TodoList />
      </div>
    );
  }
}

export default App;
