import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

// enums
enum FilterEnums {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

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
    addTodo: (state, action: PayloadAction<{ task: string }>) => {
      if(action.payload.task.length == 0) return state;

      const todo: Todo = {
        id: nanoid(6),
        task: action.payload.task,
        isCompleted: false,
        createdAt: Date.now(),
      };

      state.todoList.push(todo);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; task: string }>
    ) => {
      const findIdx = state.todoList.findIndex((task) => {
        task.id == action.payload.id;
      });
      if (findIdx != -1) {
        state.todoList[findIdx].task = action.payload.task;
      }
    },
  },
});

export const { addTodo, updateTodo, setTask } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

// types
type UpdatePayload = {
  id: number;
  task: string;
};

type Filter = {
  types: FilterEnums[];
  active: FilterEnums;
};

type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: number;
};

type TodoApp = {
  task: string;
  todoList: Todo[];
  filter: Filter;
};
