"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../lib/hooks";
import {
  changeEditModeAndUpdateTask,
  isCompletedTodoTask,
  removeTask,
} from "../../lib/store";
type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  editMode: boolean;
};

const TodoTask = ({ id, task, isCompleted, editMode }: Task) => {
  const dispatch = useAppDispatch();
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
    if (editMode) return;
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
        className="w-[26px] h-[26px] rounded-full flex text-green-600 p-1  items-center justify-center 
         border border-gray-400 "
      >
        {isCompleted && (
          <FontAwesomeIcon className="w-full h-full" icon={faCheck} />
        )}
      </div>
      <div className="flex items-center flex-1">
        {editMode ? (
          <div
          className="w-full h-[80px] border rounded-md
           border-gray-400  flex items-center overflow-auto"
          >
            <textarea
              maxLength={80}
              name="taskText"
              value={textareaValue}
              onChange={changeTextAreaHandler}
              className="flex flex-[0.9] resize-none h-full p-2 text-sm outline-none "
            />
            
            <div className="flex items-end justify-center px-1 h-full flex-[0.1] text-sm font-normal bg-gray-300">
                <span>{textareaValue.length}/{80}</span>
            </div>
          </div>
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
              <FontAwesomeIcon
                className="sm:hidden text-base"
                icon={faCirclePlus}
              />
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
