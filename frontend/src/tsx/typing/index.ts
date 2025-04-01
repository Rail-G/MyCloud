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
    id: number,
    username: string,
    email: string,
    is_staff: boolean,
    user_folder: number,
}

export interface FormState {
    userInfo: null | UserInfo,
    loading: boolean,
    error: null | ErrorFormData,
    isAuthenticated: boolean
}

export interface StorageFile{
    id: number,
    file: string,
    file_name: string,
    size: number,
    extensions: string,
    share_link: string,
    comment: string,
    created: string,
    downloaded: boolean | string,
    user: number
}

export interface StorageFolder {
    id: number,
    folder_name: string
}

export interface StoragePayloadAction {
    id: number,
    files: StorageFile[],
    folders: StorageFolder[],
    curentfolders: StorageFolder,
}

export interface StorageAjaxResponse {
    id: number,
    user: number,
    folder_name: string,
    parent_folder: number | null,
    files: StorageFile[],
    folders: StorageFolder[]
}

export interface StorageState {
    files: StorageFile[],
    folders: StorageFolder[],
    curentfolders: StorageFolder[],
    currentFolder: number | null,
    loading: boolean,
    error: string | null
}

export interface FileState {
    shareLink: string,
    created: boolean,
    loading: boolean,
    error: string | null
}

export interface FolderState {
    loading: boolean,
    error: string | null
}

export interface RetrieveFile {
    id: number, 
    currentFolder: number
}

export interface DownloadFile {
    id: number,
    fileName: string,
    currentFolder: number
}

export interface PathFile {
    id: number,
    fileName: string,
    user: number,
    folder: number,
    comment: string, 
}

export interface SearchTool {
    searchValue: string,
    onChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface NotificationType {
    operationType: boolean,
    text: string
}