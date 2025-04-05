import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdminEdit, AdminSlice, AdminUser, StoragePayloadAction, UserInfo } from "../../../typing"

const initialState: AdminSlice = {
    users: [],
    userFiles: [],
    userFolders: [],
    currentFolders: [],
    currentUser: null,
    currentUserFolder: null,
    page: 1,
    param: '',
    loading: false,
    error: null,
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<{page: number, param: string}>) => {
            state.loading = true
            state.page = action.payload.page
            state.param = action.payload.param
            state.error = null
        },
        editUser: (state, _action: PayloadAction<AdminEdit>) => {
            state.loading = true;
            state.error = null
        },
        setUser: (state, action: PayloadAction<AdminUser>) => {
            state.currentUser = action.payload
        },
        deleteUser: (state, _action: PayloadAction<{id: number}>) => {
            state.loading = true;
            state.error = null
        },
        adminSuccess: (state, action: PayloadAction<AdminUser[] | null>) => {
            state.loading = false
            state.users = action.payload != null ? action.payload : state.users
        },
        adminError: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        getUserItems: (state, _action: PayloadAction<number | null>) => {
            state.loading = true;
            state.error = null;
        },
        getUserItemsSuccess: (state, action: PayloadAction<StoragePayloadAction>) => {
            state.loading = false;
            state.userFiles = action.payload.files;
            state.userFolders = action.payload.folders;
            state.currentUserFolder = action.payload.id;
            state.currentFolders = [...state.currentFolders, action.payload.curentfolders];
        },
        setCurrentFolderAdmin: (state, action: PayloadAction<{folderId: number | null, filterCount: number | null}>) => {
            state.currentFolders = state.currentFolders.splice(0, action.payload.filterCount != null ? action.payload.filterCount : state.currentFolders.length - 2)
            state.currentUserFolder = action.payload.folderId
        },
        backToTable: (state) => {
            state.userFiles = [],
            state.userFolders = [],
            state.currentUser = null
        },
        logoutUserAdmin: (state) => {
            state.users = []
            state.userFiles = []
            state.currentUser = null,
            state.currentUserFolder = 0,
            state.page = 1,
            state.param = '';
        }
    }
})

export const {getUsers, adminSuccess, adminError, editUser, deleteUser,getUserItems, getUserItemsSuccess, setCurrentFolderAdmin, backToTable, logoutUserAdmin, setUser} = adminSlice.actions
export type adminAction = ReturnType<typeof adminSlice.actions[keyof typeof adminSlice.actions]>
export default adminSlice.reducer