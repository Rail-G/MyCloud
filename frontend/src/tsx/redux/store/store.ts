import { configureStore } from "@reduxjs/toolkit";
import { formAction } from "../slice/FormSlice/FormSlice";
import { FormState } from "../../typing";
import { createEpicMiddleware } from "redux-observable";
import { combinedEpic } from "../epic";
import { combinedSlices } from "../slice";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

export const store = configureStore({
    reducer: combinedSlices,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(combinedEpic)

export type RootDispatch = typeof store.dispatch
export type RootAction = formAction
export type RootState = {form: FormState}