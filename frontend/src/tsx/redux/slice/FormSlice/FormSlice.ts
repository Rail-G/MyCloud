import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorFormData, FormData, FormState, UserInfo } from "../../../typing";

const initialState: FormState = {
    userInfo: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    cookie: false
}

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        getUser: (state, _action: PayloadAction<FormData>) => {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state, action: PayloadAction<UserInfo>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload
        },
        getUserError: (state, action: PayloadAction<ErrorFormData>) => {
            state.loading = false;
            state.error = action.payload
        },
        logoutUser: (state) => {
            state.error = null
        },
        logoutUserSuccess: (state) => {
            state.userInfo = null
            state.isAuthenticated = false
        },
        createUser: (state, _action: PayloadAction<FormData>) => {
            state.loading = true;
            state.error = null;
        },
        createUserSuccess: (state) => {
            state.loading = false;
        },
        createUserError: (state, action: PayloadAction<FormData>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCookie: (state) => {
            state.cookie = true
        }
    }
})

export const {getUser, getUserError, getUserSuccess, createUser, createUserError, createUserSuccess, logoutUser, logoutUserSuccess, setCookie} = formSlice.actions
export type formAction = ReturnType<typeof formSlice.actions[keyof typeof formSlice.actions]>
export default formSlice.reducer