import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStorageItems } from "../slice/StorageSlice/StorageSlice";
import { useAppDispatch } from "../../hooks";

export const addFileThunk = createAsyncThunk(
    'file/upload',
    async (data: FormData) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/files/create/`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Не удалось загрузить файл')
        }

        return await response.json()
    }
)