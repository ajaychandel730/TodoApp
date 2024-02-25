import { FilterEnums } from "./enums";
import { MongoClient } from "mongodb";

type MongoDBClient = MongoClient;

type UpdatePayload = {
  id: number;
  task: string;
};

type Filter = {
  types: FilterEnums[];
  active: FilterEnums;
};

type Todo = {
  _id: string;
  task: string;
  isCompleted: boolean;
  editMode?: boolean;
  createdAt: Date;
};

type TodoApp = {
  task: string;
  todoList: Todo[];
  filter: Filter;
};

/// -------------------------------> fetch api realted type
type AddTodoFetchResponse = {
  status: string;
  data: Todo;
};

type FetchError = {
  status: string;
  message: string;
};

type GetAllTodoResponse = {
  status: string;
  data: Todo[];
};

// -------------------> Alert type
type Alert = {
  isAlert: boolean;
  isProcessing: boolean;
  statusCode: number;
  message: string;
};

export type {
  UpdatePayload,
  Filter,
  Todo,
  TodoApp,
  MongoDBClient,
  GetAllTodoResponse,
  FetchError,
  AddTodoFetchResponse,
  Alert
};
