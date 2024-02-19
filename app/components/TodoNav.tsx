"use client";
import { FilterEnums } from "../../lib/enums";
import { RootState, changeTodoActiveFilter } from "../../lib/store";
import React from "react";
import {useAppDispatch, useAppSelector } from "../../lib/hooks";

const TodoNav = () => {
  const todoFilter = useAppSelector(
    (state: RootState) => state.todoReducer.filter
  );
  const dispatch = useAppDispatch();

  const clickHandler = (type:FilterEnums):void=>{
      dispatch(changeTodoActiveFilter({filter : type}));
  };

  return (
    <div className="text-sm font-medium flex w-full items-center justify-evenly border-b border-gray-500">
      {todoFilter.types.map((type) => (
        <div
          key={type}
          onClick={():void=>{clickHandler(type)}}
          className={`border-b cursor-pointer  text-center w-[105px] ${
            todoFilter.active === type
              ? "border-b-black"
              : "border-b-transparent"
          }  mb-[-0.5px]`}
        >
          {type || ""}
        </div>
      ))}
    </div>
  );
};

export default TodoNav;
