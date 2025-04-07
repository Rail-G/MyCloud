/* eslint @typescript-eslint/no-unused-vars: "off" */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteFile, DownloadFile, FileState, PathFile, RetrieveFile } from "../../../typing";
import { addFileThunk } from "../../thunk/addFileThunk";

const initialState: FileState = {
    shareLink: '',
    created: false,
    loading: false,
    error: null
}

const fileSlice = createSlice({
    name: 'fileSlice',
    initialState,
    reducers: {
        deleteFile: (state, _action: PayloadAction<DeleteFile>) => {
            state.loading = true;
            state.error = null;
        },
        getShareLink: (state, _action: PayloadAction<RetrieveFile>) => {
            state.loading = true;
            state.error = null;
        },
        downloadFile: (state, _action: PayloadAction<DownloadFile>) => {
            state.loading = true;
            state.error = null;
        },
        changeFile: (state, _action: PayloadAction<PathFile>) => {
            state.loading = true;
            state.error = null;
        },
        fileSuccess: (state, action: PayloadAction<{share_link: string} | null> ) => {
            state.loading = false;
            state.shareLink = action.payload!.share_link ? action.payload!.share_link : ''
        },
        fileError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addFileThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.created = false
        })
        .addCase(addFileThunk.fulfilled, (state) => {
            state.loading = false
            state.created = true
        })
        .addCase(addFileThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
            state.created = false
        })
    },
})

export const {deleteFile, getShareLink, downloadFile, changeFile, fileError, fileSuccess} = fileSlice.actions
export type fileAction = ReturnType<typeof fileSlice.actions[keyof typeof fileSlice.actions]>
export default fileSlice.reducer