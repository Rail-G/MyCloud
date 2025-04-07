import { Epic, ofType } from "redux-observable";
import { RootAction, RootState } from "../../store/store";
import { changeFile, deleteFile, downloadFile, fileError, fileSuccess, getShareLink } from "../../slice/FileSlice/FileSlice";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { setCurrentFolder } from "../../slice/StorageSlice/StorageSlice";
import { setCurrentFolderAdmin } from "../../slice/AdminSlice/AdminSlice";

export const deleteFileEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(deleteFile.type),
    switchMap((action) => ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/files/${action.payload.id}/`,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map(() => {
                if (action.payload.admin) {
                    return setCurrentFolderAdmin({folderId: action.payload.currentFolder, filterCount: action.payload.curentFolders})
                } 
                return setCurrentFolder({folderId: action.payload.currentFolder, filterCount: action.payload.curentFolders})
            }),
            catchError(error => of(fileError(error.response)))
        )
    )
)

export const downloadFileEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(downloadFile.type),
    switchMap((action) => ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/files/download/${action.payload.id}/`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            responseType: 'blob',
            withCredentials: true
        }).pipe(
            mergeMap((responseData) => {
                console.log(responseData)
                const url = window.URL.createObjectURL(responseData.response as Blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = action.payload.fileName;
                document.body.appendChild(a);
                a.click();
                console.log(a)
                a.remove();
                return [fileSuccess(null)]
            }),
            catchError(error => of(fileError(error.response)))
        )
    )
)

export const shareFileEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(getShareLink.type),
    switchMap((action) => ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/files/share-link/${action.payload.id}/`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            mergeMap((responseData) => [fileSuccess(responseData.response as {share_link: string})]),
            catchError(error => of(fileError(error.response)))
        )
    )
)

export const changeFileEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(changeFile.type),
    switchMap((action) => ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/files/${action.payload.id}/`,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: {id: action.payload.id, file_name: action.payload.fileName, user: action.payload.user, folder: action.payload.folder, comment: action.payload.comment},
            withCredentials: true
        }).pipe(
            mergeMap((responseData) => {
                if (action.payload.admin) {
                    return [fileSuccess(responseData.response as null), setCurrentFolderAdmin({folderId: action.payload.folder, filterCount: action.payload.curentFolders})]
                }
                return [fileSuccess(responseData.response as null), setCurrentFolder({folderId: action.payload.folder, filterCount: action.payload.curentFolders})]
            }),
            catchError(error => of(fileError(error.response[0])))
        )
    )
)

// export const addFileEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
//     ofType('file/upload/fulfilled'),
//     map((action) => getStorageItems(action))
// )