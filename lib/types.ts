import { FilterEnums } from "./enums";

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
  editMode: boolean;
  createdAt: number;
};

type TodoApp = {
  task: string;
  todoList: Todo[];
  filter: Filter;
};

export type {UpdatePayload, Filter, Todo, TodoApp}