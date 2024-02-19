"use client";

import React from "react";
import TodoTask from "./TodoTask";
import { useAppSelector } from "../../lib/hooks";
import { RootState } from "../../lib/store";
import { Todo } from "../../lib/types";
import filterTodos from "../../utils/filterTodos";

const TodoList = () => {
  const { todoList, filter } = useAppSelector(
    (state: RootState) => state.todoReducer
  );

  let filterList: Todo[] = filterTodos(todoList, filter.active);
 
  const FilterTodoList = (list: Todo[]): React.JSX.Element[] => {
    if (list.length == 0) {
      return [
        <div key={"NoTodo"} className="flex items-center text-sm font-[500] justify-center w-full">
          <span>No task</span>
        </div>
      ];
    }

    return list.map((todo) => (
      <TodoTask
        key={todo.id}
        id={todo.id}
        task={todo.task}
        isCompleted={todo.isCompleted}
        editMode={todo.editMode}
      />
    ));
  };

  return (
    <div className="flex flex-col w-full bg-red space-y-4">
        {FilterTodoList(filterList)}
    </div>
  );
};

export default TodoList;
