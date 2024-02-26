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
      const res = await fetch("/api/getAllTodo", {cache : "no-store"});
      const data: GetAllTodoResponse | FetchError = await res.json();
      if ("data" in data) {
        if (data.status == "ok") dispatch(setTodoList(data.data));
      } else {
        dispatch(
          updateAlert({
            isAlert: true,
            isProcessing: true,
            message: data.message || "Something went wrong.",
            statusCode: res.status,
          })
        );
      }
    } catch (err: unknown) {
      const message: string = getErrorMessage(err);
      dispatch(
        updateAlert({
          isAlert: true,
          isProcessing: true,
          message,
          statusCode: 500,
        })
      );
    } finally {
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
