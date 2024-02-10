"use client";
import React, { useState } from "react";
const TodoList = () => {
  const [task, setTask] = useState<string>("mongo");
  return (
    <div className="flex items-center space-x-2">
      <div className="w-[20px] h-[20px] rounded-sm border border-gray-400 "></div>
      <div className="flex items-center flex-1">
        <p>{task || ""}</p>
        {/* <textarea
          maxLength={50}
          value={task}
          className="w-full h-fit border mt-4 border-gray-400 outline-none  flex p-2 items-center overflow-auto resize-none"
        /> */}
      </div>
      <button className="btn">Delete</button>
      <button className="btn">Edit</button>
    </div>
  );
};

export default TodoList;
