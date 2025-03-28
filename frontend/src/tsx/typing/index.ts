export interface ErrorFormData {
    username?: string,
    email?: string,
    password?: string,
    error?: string,
}

export interface FormData {
    username: string,
    email?: string,
    password: string,
}

export interface UserInfo {
    username: string,
    email: string
    is_staff: boolean
}

export interface FormState {
    userInfo: null | UserInfo,
    loading: boolean,
    error: null | ErrorFormData,
    isAuthenticated: boolean
}