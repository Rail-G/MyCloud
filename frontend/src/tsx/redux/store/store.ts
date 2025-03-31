import { configureStore } from "@reduxjs/toolkit";
import { formAction } from "../slice/FormSlice/FormSlice";
import { FileState, FolderState, FormState, StorageState } from "../../typing";
import { createEpicMiddleware } from "redux-observable";
import { combinedEpic } from "../epic";
import { combinedSlices } from "../slice";
import { storageAction } from "../slice/StorageSlice/StorageSlice";
import { fileAction } from "../slice/FileSlice/FileSlice";
import { folderAction } from "../slice/FolderSlice/FolderSlice";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

export const store = configureStore({
    reducer: combinedSlices,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(combinedEpic)

export type RootDispatch = typeof store.dispatch
export type RootAction = formAction | storageAction | fileAction | folderAction
export type RootState = {form: FormState, storage: StorageState, file: FileState, folder: FolderState}