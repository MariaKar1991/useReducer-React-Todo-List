import { useReducer } from "react";
import "./Todos.css";

const initialState = [];

const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_TASK = "TOGGLE_TASK";

function reducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
          completed: false,
        },
      ];

    case DELETE_TASK:
      return state.filter((item) => item.id !== action.payload);

    case TOGGLE_TASK:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );

    default:
      return state;
  }
}

export default function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialState);

  function toggleTaskCompletion(id) {
    dispatch({ type: TOGGLE_TASK, payload: id });
  }

  return (
    <>
      <h1 className="todo-List-Title">My Epic To-do List - Tasks Total: {todos.length}</h1>
      <label className="new-Task-Input-Title" htmlFor="new-Task-Input">Add New Epic Task: </label>
      <input
        className="input-Field"
        type="text"
        id="new-Task-Input"
        onBlur={(e) => dispatch({ type: ADD_TASK, payload: e.target.value })}
      />

      <hr />
      {todos.map((todo) => (
        <li
          className={`todo-Item ${todo.completed ? "completed" : ""}`}
          key={todo.id}
          onClick={() => toggleTaskCompletion(todo.id)}
        >
          {todo.name}{" "}
          <span>
            <button
              className="delete-Button"
              onClick={() => dispatch({ type: DELETE_TASK, payload: todo.id })}
            >
              Delete
            </button>
            <hr />
          </span>
        </li>
      ))}
    </>
  );
}
