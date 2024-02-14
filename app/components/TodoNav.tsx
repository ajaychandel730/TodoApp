"use client";
import { RootState } from "@/lib/store";
import React from "react";
import {useSelector } from "react-redux";

const TodoNav = () => {
  const todoFilter = useSelector(
    (state: RootState) => state.todoReducer.filter
  );

  const clickHandler = (e:React.MouseEvent<HTMLDivElement>):void=>{
       
  };

  return (
    <div className="text-base font-medium flex w-full items-center justify-evenly border-b border-gray-500">
      {todoFilter.types.map((type) => (
        <div
          key={type}
          onClick={clickHandler}
          className={`border-b text-center w-[20%] ${
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
