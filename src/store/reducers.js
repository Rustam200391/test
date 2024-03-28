// reducers.js
import { combineReducers } from "redux";
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  EDIT_TASK,
  FILTER_TASKS,
} from "./actions";

const tasks = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, ...action.payload.updatedTask }
          : task
      );
    default:
      return state;
  }
};

const filter = (state = "all", action) => {
  switch (action.type) {
    case FILTER_TASKS:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks,
  filter,
});

// Добавим вывод состояния хранилища в консоль
console.log("Initial state:", rootReducer(undefined, {}));

export default rootReducer;
