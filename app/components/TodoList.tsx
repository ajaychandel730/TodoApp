"use client";

import React from "react";
import TodoTask from "./TodoTask";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const TodoList = () => {
  const todoList = useSelector(
    (state: RootState) => state.todoReducer.todoList
  );


  return (
    <div className="flex flex-col w-full bg-red space-y-4">
      {todoList.map((todo) => (
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
