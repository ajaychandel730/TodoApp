import { createSlice } from "@reduxjs/toolkit/react";
import { PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "lib/types";


const initialState:Alert = {
    isAlert : false,
    isProcessing : false,
    statusCode : 0,
    message : ""
}

const alertslice = createSlice({
    name : "alertReducer",
    initialState,
    reducers : {
        updateAlert : (state, action:PayloadAction<Alert>)=>{
           return state = action.payload;
        }
    }
});


export const {updateAlert} = alertslice.actions;
export const alertReducer = alertslice.reducer;
