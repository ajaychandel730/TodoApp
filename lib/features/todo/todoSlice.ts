import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { FilterEnums } from "../../enums";
import { Todo, TodoApp } from "../../types";

const initialState: TodoApp = {
  task: "",
  todoList: [],
  filter: {
    types: [FilterEnums.ALL, FilterEnums.ACTIVE, FilterEnums.COMPLETED],
    active: FilterEnums.ALL,
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<string>) => {
      state.task = action.payload;
    },
    setTodoList  : (state, action:PayloadAction<Todo[]>)=>{
       state.todoList = action.payload; 
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (action.payload.task.length == 0) return state;

      const todo: Todo = {
        ...action.payload,
        editMode: false,
      };

      state.todoList.push(todo);
    },
    changeEditModeAndUpdateTask: (
      state,
      action: PayloadAction<{ id: string; editMode: boolean; task: string }>
    ) => {
      const idx = state.todoList.findIndex(
        (val) => val._id == action.payload.id
      );
      if (idx !== -1) {
        state.todoList[idx].editMode = action.payload.editMode;
        state.todoList[idx].task = action.payload.task;
      }
    },
    isCompletedTodoTask: (
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>
    ) => {
      const idx = state.todoList.findIndex(
        (val) => val._id === action.payload.id
      );
      if (idx !== -1) {
        state.todoList[idx].isCompleted = action.payload.isCompleted;
      }
    },

    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      state.todoList = state.todoList.filter(
        (task) => task._id !== action.payload.id
      );
    },
    changeTodoActiveFilter: (
      state,
      action: PayloadAction<{ filter: FilterEnums }>
    ) => {
      state.filter.active = action.payload.filter;
    },
  },
});

export const {
  addTodo,
  changeEditModeAndUpdateTask,
  setTask,
  isCompletedTodoTask,
  removeTask,
  changeTodoActiveFilter,
  setTodoList,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
