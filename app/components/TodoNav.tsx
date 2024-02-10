"use client";
import { RootState } from "@/lib/store";
import React from "react";
import { UseDispatch, useSelector } from "react-redux";

const TodoNav = () => {
  const todoFilter = useSelector(
    (state: RootState) => state.todoReducer.filter
  );

  return (
    <div className="text-base font-medium flex w-full items-center justify-evenly border-b border-gray-500">
      {todoFilter.types.map((type) => (
        <div key={type} className="border-b text-center w-[20%] border-b-black mb-[-0.5px]">
          {type || ""}
        </div>
      ))}
    </div>
  );
};

export default TodoNav;
