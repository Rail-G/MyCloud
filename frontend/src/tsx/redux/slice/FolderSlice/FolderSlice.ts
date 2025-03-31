import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FolderState } from "../../../typing";

const initialState: FolderState = {
    loading: false,
    error: null
}

interface CreateFolder {
    folderName: string,
    user: number,
    currentFolder: number,
    navNumber: number
}

interface EditFolder {
    id: number,
    folderName: string,
    currentFolder: number,
    navNumber: number
}

interface DeleteFolder {
    id: number,
    previewFolder: number
}

const folderSlice = createSlice({
    name: 'folderSlice',
    initialState,
    reducers: {
        addFolder: (state, _action: PayloadAction<CreateFolder>) => {
            state.loading = true;
            state.error = null;
        },
        editFolder: (state, _action: PayloadAction<EditFolder>) => {
            state.loading = true;
            state.error = null;
        },
        deleteFolder: (state, _action: PayloadAction<DeleteFolder>) => {
            state.loading = true;
            state.error = null;
        },
        folderSuccess: (state) => {
            state.loading = false;
        },
        folderError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    }
})

export const {addFolder, editFolder, deleteFolder, folderError, folderSuccess} = folderSlice.actions
export type folderAction = ReturnType<typeof folderSlice.actions[keyof typeof folderSlice.actions]>
export default folderSlice.reducer