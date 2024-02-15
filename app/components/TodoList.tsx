"use client";

import React from "react";
import TodoTask from "./TodoTask";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Todo } from "@/lib/types";
import filterTodos from "@/utils/filterTodos";

const TodoList = () => {
  const { todoList, filter } = useSelector(
    (state: RootState) => state.todoReducer
  );

  let filterList: Todo[] = filterTodos(todoList, filter.active);
  console.log("new :", filterList);

  return (
    <div className="flex flex-col w-full bg-red space-y-4">
      {filterList.map((todo) => (
        <TodoTask
          key={todo.id}
          id={todo.id}
          task={todo.task}
          isCompleted={todo.isCompleted}
          editMode={todo.editMode}
        />
      ))}
    </div>
  );
};

export default TodoList;
