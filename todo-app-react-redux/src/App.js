import React, { Component } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import RemoveAll from "./RemoveAll";
import "./App.css";
import Filters from "./Filters";
import { connect } from "react-redux";
import {
  setFilter,
  setTodos,
  addTodo,
  removeTodo,
  removeAll,
  toggleTodo
} from "./actionCreaters";

class App extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);

    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.toggleCompleteStatus = this.toggleCompleteStatus.bind(this);
  }

  componentDidMount() {
    let localTodos = window.localStorage.getItem("todos");
    if (localTodos) {
      localTodos = JSON.parse(localTodos);
    }
    this.props.addTodos(localTodos || []);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.todos) !== JSON.stringify(this.props.todos)) {
      window.localStorage.setItem("todos", JSON.stringify(this.props.todos));
    }
  }

  addTodo(newTodo) {
    this.props.addTodo({
      content: newTodo,
      id: Math.random(),
      checked: false
    });
  }

  removeTodo = id => {
    this.props.removeTodo(id);
  };

  removeAllTodos() {
    this.props.removeAll();
  }

  toggleCompleteStatus(id) {
    this.props.toggleTodo(id);
  }

  filterTodos = (todos, filterType) => {
    if (filterType === "all") {
      return todos;
    } else if (filterType === "completed") {
      return todos.filter(todo => todo.checked);
    } else {
      return todos.filter(todo => !todo.checked);
    }
  };

  render() {
    console.log("App props", this.props);
    return (
      <div className="App" id="todo">
        <div className="todo-list todo-list-add">
          <h3>Todo Ekle / Sil</h3>
          <div>
            <AddTodo onTodoAdd={this.addTodo} />
            <RemoveAll onRemoveAll={this.removeAllTodos} />
            <Filters />
          </div>
        </div>
        <TodoList
          title="Todolist"
          todos={this.filterTodos(this.props.todos, this.props.activeFilter)}
          removeTodo={this.removeTodo}
          onCheckedToggle={this.toggleCompleteStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeFilter: state.activeFilter,
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodos: todos => {
    dispatch(setTodos(todos));
  },
  addTodo: todo => {
    dispatch(addTodo(todo));
  },
  removeTodo: id => {
    dispatch(removeTodo(id));
  },
  removeAll: () => {
    dispatch(removeAll());
  },
  toggleTodo: id => {
    dispatch(toggleTodo(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
