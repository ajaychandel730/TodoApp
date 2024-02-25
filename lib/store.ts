import { configureStore } from "@reduxjs/toolkit";
// todo slice
import { todoReducer } from "./features/todo/todoSlice";
import {
  addTodo,
  setTask,
  changeEditModeAndUpdateTask,
  isCompletedTodoTask,
  removeTask,
  changeTodoActiveFilter,
  setTodoList
} from "./features/todo/todoSlice";

// alert slice 
import { updateAlert } from "./features/Alert/alertSlice";
import { alertReducer } from "./features/Alert/alertSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer,
      alertReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export {
  addTodo,
  setTask,
  changeEditModeAndUpdateTask,
  isCompletedTodoTask,
  removeTask,
  changeTodoActiveFilter,
  setTodoList,
  updateAlert
};
