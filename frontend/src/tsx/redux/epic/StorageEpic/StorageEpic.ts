import { RootAction, RootState } from "../../store/store";
import { Epic, ofType } from "redux-observable";
import { getStorageItems, getStorageItemsError, getStorageItemsSuccess, setCurrentFolder } from "../../slice/StorageSlice/StorageSlice";
import { catchError, map, of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { StorageAjaxResponse, StoragePayloadAction } from "../../../typing";
import { logoutUserSuccess } from "../../slice/FormSlice/FormSlice";


export const storageEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(getStorageItems.type),
    switchMap((action) => {
        const url = `${import.meta.env.VITE_SERVER_URL}api/folders/${action.payload}/`;
        return ajax({
            url: url,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map((responseData) => {
                const data = responseData.response as StorageAjaxResponse
                return getStorageItemsSuccess({id: data.id, files: data.files, folders: data.folders, curentfolders: {id: data.id, folder_name: data.folder_name}} as StoragePayloadAction)
            }),
            catchError((error) => of(logoutUserSuccess(), getStorageItemsError(error.response)))
        )
    })
)

export const setFolderEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(setCurrentFolder.type),
    map((action) => getStorageItems(action.payload.folderId))
)