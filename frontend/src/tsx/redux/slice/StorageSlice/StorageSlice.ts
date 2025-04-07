/* eslint @typescript-eslint/no-unused-vars: "off" */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoragePayloadAction, StorageState } from "../../../typing";

const initialState: StorageState = {
    files: [],
    folders: [],
    curentfolders: [],
    currentFolder: null,
    loading: false,
    error: null,
}

const storageSlice = createSlice({
    name: 'storageSlice',
    initialState,
    reducers: {
        getStorageItems: (state, _action: PayloadAction<number | null>) => {
            state.loading = true;
            state.error = null;
        },
        getStorageItemsSuccess: (state, action: PayloadAction<StoragePayloadAction>) => {
            state.loading = false;
            state.files = action.payload.files;
            state.folders = action.payload.folders;
            state.currentFolder = action.payload.id;
            state.curentfolders = [...state.curentfolders, action.payload.curentfolders];
        },
        getStorageItemsError: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        setCurrentFolder: (state, action: PayloadAction<{folderId: number | null, filterCount: number | null}>) => {
            state.curentfolders = state.curentfolders.splice(0, action.payload.filterCount != null ? action.payload.filterCount : state.curentfolders.length - 2)
            state.currentFolder = action.payload.folderId
        },
        logoutUserStorage: (state) => {
            state.files = [];
            state.folders = [];
            state.curentfolders = [];
            state.currentFolder = null;
        }
    }
})

export const {getStorageItems, getStorageItemsError, getStorageItemsSuccess, setCurrentFolder, logoutUserStorage} = storageSlice.actions
export type storageAction = ReturnType<typeof storageSlice.actions[keyof typeof storageSlice.actions]>
export default storageSlice.reducer