import { Epic, ofType } from "redux-observable";
import { RootAction, RootState } from "../../store/store";
import { addFolder, deleteFolder, editFolder, folderError } from "../../slice/FolderSlice/FolderSlice";
import { catchError, map, of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { getStorageItems, setCurrentFolder } from "../../slice/StorageSlice/StorageSlice";


export const addFolderEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe (
    ofType(addFolder.type),
    switchMap((action) => 
        ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/folders/create/`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {'folder_name': action.payload.folderName, 'user': action.payload.user, parent_folder: action.payload.currentFolder},
            withCredentials: true
        }).pipe(
            map(() => setCurrentFolder({folderId: action.payload.currentFolder, filterCount: action.payload.navNumber})),
            catchError((error) => of(folderError(error.response.message)))
        )
    )
)

export const editFolderEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe (
    ofType(editFolder.type),
    switchMap((action) => 
        ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/folders/${action.payload.id}/`,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: {'folder_name': action.payload.folderName},
            withCredentials: true
        }).pipe(
            map(() => setCurrentFolder({folderId: action.payload.currentFolder, filterCount: action.payload.navNumber})),
            catchError((error) => of(folderError(error.response.message)))
        )
    )
)

export const deleteFolderEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe (
    ofType(deleteFolder.type),
    switchMap((action) => 
        ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/folders/${action.payload.id}/`,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map(() => setCurrentFolder({folderId: action.payload.previewFolder, filterCount: null})),
            catchError((error) => of(folderError(error.response.message)))
        )
    )
)