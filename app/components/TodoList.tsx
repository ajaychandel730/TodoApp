"use client";
import React from "react";
import TodoTask from "./TodoTask";
import { useLayoutEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { RootState, setTodoList, updateAlert } from "../../lib/store";
import { Todo } from "../../lib/types";
import filterTodos from "../../utils/filterTodos";
import { getErrorMessage } from "utils/serverFunctions";
import { FetchError, GetAllTodoResponse } from "../../lib/types";

const TodoList = () => {
  const { todoList, filter } = useAppSelector(
    (state: RootState) => state.todoReducer
  );
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  let filterList: Todo[] = filterTodos(todoList, filter.active);

  const FilterTodoList = (list: Todo[]): React.JSX.Element[] => {
    if (list.length == 0) {
      return [
        <div
          key={"NoTodo"}
          className="flex items-center text-sm font-[500] justify-center w-full"
        >
          <span>{loading ? "loading..." : "No Task"}</span>
        </div>,
      ];
    } else {
      return list.map((todo: Todo) => (
        <TodoTask
          key={todo._id}
          id={todo._id}
          task={todo.task}
          isCompleted={todo.isCompleted}
          editMode={todo.editMode}
        />
      ));
    }
  };

  const getAllTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getAllTodo");
      const data:(GetAllTodoResponse | FetchError) = await res.json();
      if ("data" in data) {
        if (data.status == "ok") dispatch(setTodoList(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (err: unknown) {
      console.error(getErrorMessage(err));
    } finally {
      dispatch(updateAlert({
        isAlert : true,
        isProcessing : true,
        message : "Something went wrong.",
        statusCode : 400
      }));
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="flex flex-col w-full bg-red space-y-4">
      {FilterTodoList(filterList)}
    </div>
  );
};

export default TodoList;
