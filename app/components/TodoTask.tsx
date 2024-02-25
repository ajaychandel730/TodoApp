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
  updateAlert,
} from "../../lib/store";
import { getErrorMessage } from "utils/serverFunctions";
type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  editMode: boolean;
};

const TodoTask = ({ id, task, isCompleted, editMode }: Task) => {
  const dispatch = useAppDispatch();
  const [textareaValue, setTextAreaValue] = useState<string>(task);
  const [loading, setLoading] = useState<{ delete: boolean; update: boolean }>({
    delete: false,
    update: false,
  });

  const editClickHandler = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      const taskValue = editMode ? textareaValue : task;
      if (editMode && taskValue !== task && taskValue.length > 0) {
        setLoading((val) => ({ ...val, update: true }));
        const res = await fetch("/api/updateTodo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id, taskValue }),
        });

        const data = await res.json();

        if (data.status == "ok") {
          dispatch(
            changeEditModeAndUpdateTask({
              id,
              editMode: !editMode,
              task: taskValue,
            })
          );
          dispatch(
            updateAlert({
              isAlert: true,
              isProcessing: true,
              statusCode: res.status,
              message: data.message || "Task is updated successfully.",
            })
          );
        } else {
          dispatch(
            updateAlert({
              isAlert: true,
              isProcessing: true,
              statusCode: res.status,
              message:
                data.message || "Something went wrong. Please try later.",
            })
          );
        }
      } else {
        dispatch(
          changeEditModeAndUpdateTask({
            id,
            editMode: !editMode,
            task: taskValue,
          })
        );
      }
    } catch (err) {
      const message = getErrorMessage(err);
      dispatch(
        updateAlert({
          isAlert: true,
          isProcessing: true,
          statusCode: 500,
          message,
        })
      );
    } finally {
      setLoading((val) => ({ ...val, update: false }));
    }
  };

  const changeTextAreaHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTextAreaValue(e.target.value);
  };

  const isCompletedClickHandler = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    if (editMode) return;

    try {
      setLoading((val) => ({ ...val, update: true }));
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id, isCompleted: !isCompleted }),
      });

      const data = await res.json();

      if (data.status == "ok") {
        dispatch(isCompletedTodoTask({ id, isCompleted: !isCompleted }));
        dispatch(
          updateAlert({
            isAlert: true,
            isProcessing: true,
            statusCode: res.status,
            message: !isCompleted?  "Task is completed." : "Task active again.",
          })
        );
      } else {
        dispatch(
          updateAlert({
            isAlert: true,
            isProcessing: true,
            statusCode: res.status,
            message: data.message || "Something went wrong. Please try later.",
          })
        );
      }
    } catch (err) {
      const message = getErrorMessage(err);
      dispatch(
        updateAlert({
          isAlert: true,
          isProcessing: true,
          statusCode: 200,
          message,
        })
      );
    }
  };

  const removeTaskClickHandler = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    try {
      setLoading((val) => ({ ...val, delete: true }));
      const res = await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.status == "ok") {
        dispatch(removeTask({ id }));
        dispatch(
          updateAlert({
            isAlert: true,
            isProcessing: true,
            message: "Task is removed.",
            statusCode: res.status,
          })
        );
      } else {
        dispatch(
          updateAlert({
            isAlert: true,
            isProcessing: true,
            message: "Something went wrong.",
            statusCode: res.status,
          })
        );
      }
    } catch (err) {
      const message: string = getErrorMessage(err);
      dispatch(
        updateAlert({
          isAlert: true,
          isProcessing: true,
          message,
          statusCode: 500,
        })
      );
    } finally {
      setLoading((val) => ({ ...val, delete: false }));
    }
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
              <span>
                {textareaValue.length}/{80}
              </span>
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
