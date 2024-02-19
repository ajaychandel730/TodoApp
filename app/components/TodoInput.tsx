"use client";
import { RootState } from "../../lib/store";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { setTask, addTodo } from "../../lib/store";

const TodoInput = () => {
  const task = useAppSelector((state: RootState) => state.todoReducer.task);
  const dispatch = useAppDispatch();
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    dispatch(setTask(value));
  };

 const submitHandler = (e:React.FormEvent<HTMLFormElement>):void=>{
  e.preventDefault();
  dispatch(addTodo({task}));
 }

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full space-x-2 px-2">
      <div className="flex items-center p-2 flex-1 h-[35px]   border border-gray-300 rounded-md">
        <input
          className="w-full h-full text-sm !border-none !outline-none"
          type="text"
          name="task"
          value={task}
          onChange={onChangeHandler}
          placeholder="Please enter task"
        />
      </div>
      <button type="submit" className="btn" >Add</button>
    </form>
  );
};

export default TodoInput;
