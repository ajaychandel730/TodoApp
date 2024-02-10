import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

// enums
enum FilterEnums {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}


const initialState: TodoApp = {
  todoList: [],
  filter: {
    types : [FilterEnums.ALL, FilterEnums.ACTIVE, FilterEnums.COMPLETED],
    active: FilterEnums.ALL,
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<UpdatePayload>) => {
      const findIdx = state.todoList.findIndex((task) => {
        task.id == action.payload.id;
      });
      if (findIdx != -1) {
        state.todoList[findIdx].task = action.payload.task;
      }
    },
  },
});

export const {addTodo, updateTodo} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

// types
type UpdatePayload = {
  id: number;
  task: string;
};

type Filter = {
  types : FilterEnums[];
  active: FilterEnums;
};

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};

type TodoApp = {
  todoList: Todo[];
  filter: Filter;
};
