import React from "react";

const ListSekleton = () => {

    const listItem = (num:number):React.JSX.Element[]=>{
     return Array(num).fill(0).map((val)=> (
        <div className="flex w-full h-[60px] space-x-2 items-center justify-between ">
        <div className="flex h-full items-center">
          <div className="w-3.5 h-3.5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[50%]"></div>
        </div>
        <div className="flex h-full items-center space-x-2">
          <div className="px-4 py-2 bg-gray-300 rounded-md dark:bg-gray-700 "></div>
          <div className="px-4 py-2 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        </div>
      </div>
     ))
    };

    const sekletonListItems = listItem(6);
  return (
    <div
      role="status"
      className=" flex flex-col w-full  space-y-2 animate-pulse"
    >
      {sekletonListItems}
    </div>
  );
};

export default ListSekleton;
