import { configureStore } from "@reduxjs/toolkit";
import { formAction } from "../slice/FormSlice/FormSlice";
import { AdminSlice, FileState, FolderState, FormState, StorageState } from "../../typing";
import { createEpicMiddleware } from "redux-observable";
import { combinedEpic } from "../epic";
import { combinedSlices } from "../slice";
import { storageAction } from "../slice/StorageSlice/StorageSlice";
import { fileAction } from "../slice/FileSlice/FileSlice";
import { folderAction } from "../slice/FolderSlice/FolderSlice";
import { persistReducer, persistStore } from "redux-persist";
import { pesistConfig } from "../persist";
import { adminAction } from "../slice/AdminSlice/AdminSlice";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

const persistedReducer = persistReducer<ReturnType<typeof combinedSlices>>(pesistConfig, combinedSlices)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          }}).concat(epicMiddleware)
})

export const persistedStore = persistStore(store)

epicMiddleware.run(combinedEpic)

export type RootDispatch = typeof store.dispatch
export type RootAction = formAction | storageAction | fileAction | folderAction | adminAction
export type RootState = {form: FormState, storage: StorageState, file: FileState, folder: FolderState, admin: AdminSlice}