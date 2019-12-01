import {
  SET_FILTER,
  SET_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  REMOVE_ALL,
  TOGGLE_TODO
} from "./actions";

const rootReducer = function(
  state = {
    activeFilter: "all",
    todos: []
  },
  action
) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, activeFilter: action.activeFilter };
    case SET_TODOS:
      return { ...state, todos: action.todos };
    case ADD_TODO:
      return { ...state, todos: state.todos.concat([action.todo]) };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => {
          return item.id !== action.id;
        })
      };
    case REMOVE_ALL:
      return {
        ...state,
        todos: []
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.id === todo.id) {
            let currentTodo = { ...todo };
            currentTodo.checked = !currentTodo.checked;
            return currentTodo;
          } else {
            return todo;
          }
        })
      };
    default:
      return state;
  }
};

export default rootReducer;
