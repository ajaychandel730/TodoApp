"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { changeEditModeAndUpdateTask, isCompletedTodoTask } from "@/lib/store";
type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  editMode: boolean;
};

const TodoTask = ({ id, task, isCompleted, editMode }: Task) => {
  const dispatch = useDispatch();
  const [textareaValue, setTextAreaValue] = useState<string>(task);

  const editClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
    dispatch(isCompletedTodoTask({ id, isCompleted: !isCompleted }));
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
      <button className="btn task_btn">Delete</button>
      {!isCompleted && (
        <button onClick={editClickHandler} className="btn task_btn">
          {editMode ? "Save" : "Edit"}
        </button>
      )}
    </div>
  );
};

export default TodoTask;
