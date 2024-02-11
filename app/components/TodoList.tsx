"use client";

import React from "react";
import TodoTask from "./TodoTask";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const TodoList = () => {
  const todoList = useSelector(
    (state: RootState) => state.todoReducer.todoList
  );

  console.log(todoList);

  return (
    <div className="flex flex-col w-full bg-red">
      {todoList.map((todo) => (
        <TodoTask
          key={todo.id}
          task={todo.task}
          isCompleted={todo.isCompleted}
        />
      ))}
    </div>
  );
};

export default TodoList;
