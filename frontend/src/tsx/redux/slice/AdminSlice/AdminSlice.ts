import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdminEdit, AdminSlice, AdminUser, UserInfo } from "../../../typing"

const initialState: AdminSlice = {
    users: [],
    userFiles: [],
    currentUser: null,
    currentUserFolder: 0,
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

export const {getUsers, adminSuccess, adminError, editUser, deleteUser, logoutUserAdmin} = adminSlice.actions
export type adminAction = ReturnType<typeof adminSlice.actions[keyof typeof adminSlice.actions]>
export default adminSlice.reducer