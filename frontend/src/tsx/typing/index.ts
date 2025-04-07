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
    is_superuser: boolean,
    user_folder: number,
}

export interface FormState {
    userInfo: null | UserInfo,
    loading: boolean,
    error: null | ErrorFormData,
    isAuthenticated: boolean,
    cookie: boolean
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
    folder_name: string,
    onClickToFolder: (id: number) => void
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

export interface DeleteFile {
    id: number, 
    currentFolder: number,
    curentFolders: number,
    admin: boolean
}

export interface RetrieveFile {
    id: number, 
}

export interface DownloadFile {
    id: number,
    fileName: string
}

export interface PathFile {
    id: number,
    fileName: string,
    user: number,
    folder: number,
    comment: string,
    curentFolders: number,
    admin: boolean
}

export interface CreateFolder {
    folderName: string,
    user: number,
    currentFolder: number,
    navNumber: number
}

export interface EditFolder {
    id: number,
    folderName: string,
    currentFolder: number,
    navNumber: number,
    admin: boolean
}

export interface DeleteFolder {
    id: number,
    previewFolder: number,
    admin: boolean
}

export interface SearchTool {
    searchValue: string,
    onChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface NotificationType {
    operationType: boolean,
    text: string
}

export interface AdminUser {
    id: number,
    username: string,
    email: string,
    is_staff: boolean,
    is_superuser: boolean,
    is_active: boolean,
    files: number,
    folders: number,
    file_size: number,
    main_folder: number | null
}

export interface AdminSlice {
    users: AdminUser[],
    userFiles: StorageFile[],
    userFolders: StorageFolder[],
    currentFolders: StorageFolder[]
    currentUser: AdminUser | null,
    currentUserFolder: number | null,
    page: number,
    param: string,
    loading: boolean,
    error: string | null
}

export interface AdminEdit {
    id: number,
    is_staff: boolean,
    username: string
}