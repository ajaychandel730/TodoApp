"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  changeEditModeAndUpdateTask,
  isCompletedTodoTask,
  removeTask,
} from "@/lib/store";
type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  editMode: boolean;
};

const TodoTask = ({ id, task, isCompleted, editMode }: Task) => {
  const dispatch = useDispatch();
  const [textareaValue, setTextAreaValue] = useState<string>(task);

  const editClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    const taskValue = editMode ? textareaValue : task;
    dispatch(
      changeEditModeAndUpdateTask({ id, editMode: !editMode, task: taskValue })
    );
  };

  const changeTextAreaHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTextAreaValue(e.target.value);
  };

  const isCompletedClickHandler = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    if(editMode) return;
    dispatch(isCompletedTodoTask({ id, isCompleted: !isCompleted }));
  };

  const removeTaskClickHandler = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    dispatch(removeTask({ id }));
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={isCompletedClickHandler}
        className="w-[24px] h-[24px] flex text-green-600 p-1  items-center justify-center rounded-sm border border-gray-400 "
      >
        {isCompleted && (
          <FontAwesomeIcon className="w-full h-full" icon={faCheck} />
        )}
      </div>
      <div className="flex items-center flex-1">
        {editMode ? (
          <textarea
            maxLength={50}
            name="taskText"
            value={textareaValue}
            onChange={changeTextAreaHandler}
            className="w-full h-fit border mt-4 border-gray-400 outline-none  flex p-2 items-center overflow-auto resize-none"
          />
        ) : (
          <p
            className={`text-clip overflow-hidden text-wrap ${
              isCompleted && "line-through"
            }`}
          >
            {task || ""}
          </p>
        )}
      </div>
      <div className="flex items-center justify-evenly space-x-4">
        <div
          onClick={removeTaskClickHandler}
          className="flex items-center justify-center"
        >
          <button className="btn hidden sm:flex">Delete</button>
          <FontAwesomeIcon className="sm:hidden text-red-500" icon={faTrash} />
        </div>

        {!isCompleted && (
          <div
            onClick={editClickHandler}
            className="flex  items-center justify-center"
          >
            <button className="btn hidden sm:flex">
              {editMode ? "Save" : "Edit"}
            </button>
            {editMode ? (
              <FontAwesomeIcon className="sm:hidden text-base" icon={faCirclePlus} />
            ) : (
              <FontAwesomeIcon className="sm:hidden" icon={faPen} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoTask;
