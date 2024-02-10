"use client";
import React from "react";

const TodoInput = () => {
  return (
    <div className="flex items-center w-full space-x-2 px-2">
      <div className="flex items-center p-2 flex-1 h-[35px]   border border-gray-300 rounded-md">
        <input
          className="w-full h-full text-sm !border-none !outline-none"
          type="text"
          placeholder="Please enter task"
        />
      </div>
      <button className="btn">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
