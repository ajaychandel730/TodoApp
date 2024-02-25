"use client";

import { useAppDispatch, useAppSelector } from "lib/hooks";
import { RootState, updateAlert } from "lib/store";
import React from "react";

type Alert = {
  bgColor : string,
  type: string;
  message: string;
};

const Alert = () => {
  const alertState = useAppSelector((state: RootState) => state.alertReducer);
  const dispatch = useAppDispatch();
  let alertInfo: Alert;

  if (alertState.statusCode >= 200 && alertState.statusCode <= 299) {
    alertInfo = {
      bgColor : "bg-green-400",
      type: "Success alert!",
      message: alertState.message,
    };
  } else if (alertState.statusCode >= 100 && alertState.statusCode <= 199) {
    alertInfo = {
      bgColor : "bg-blue-400",
      type: "Info alert!",
      message: alertState.message,
    };
  } else {
    alertInfo = {
      bgColor : "bg-red-400",
      type: "Warning alert!",
      message: alertState.message,
    };
  }
  if (!alertState.isAlert) return null;

  setTimeout(() => {
    dispatch(
      updateAlert({
        isAlert: false,
        isProcessing: false,
        message: "",
        statusCode: 0,
      })
    );
  }, 3000);

  return (
    <>
      <div
        className={`fixed  font-medium top-4 z-50 p-4 mb-4 text-sm rounded-lg ${alertInfo.bgColor}`}
        role="alert"
      >
        <span>{alertInfo.type}</span>{" "}
        {alertInfo.message || "Something went wrong. Please try later."}
      </div>
    </>
  );
};

export default Alert;
