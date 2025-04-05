import { Epic, ofType } from "redux-observable";
import { RootAction, RootState } from "../../store/store";
import { adminError, adminSuccess, deleteUser, editUser, getUserItems, getUserItemsSuccess, getUsers, setCurrentFolderAdmin } from "../../slice/AdminSlice/AdminSlice";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AdminUser, StorageAjaxResponse, StoragePayloadAction } from "../../../typing";


export const adminGetEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(getUsers.type),
    switchMap((action) => 
        ajax<{results: AdminUser[]}>({
            url: `${import.meta.env.VITE_SERVER_URL}api/user/?page=${action.payload.page}&username=${action.payload.param}`,
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map((responseData) => adminSuccess(responseData.response.results as AdminUser[])),
            catchError((error) => of(adminError(error.response)))
        )
    )
)

export const adminEditEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(editUser.type),
    switchMap((action) => 
        ajax<{results: AdminUser[]}>({
            url: `${import.meta.env.VITE_SERVER_URL}api/user/${action.payload.id}/`,
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: {username: action.payload.username, is_staff: action.payload.is_staff},
            withCredentials: true
        }).pipe(
            map(() => getUsers({page: 1, param: ''})),
            catchError((error) => of(adminError(error.response)))
        )
    )
)

export const adminDeleteEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(deleteUser.type),
    switchMap((action) => 
        ajax<{results: AdminUser[]}>({
            url: `${import.meta.env.VITE_SERVER_URL}api/user/${action.payload.id}/`,
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map(() => getUsers({page: 1, param: ''})),
            catchError((error) => of(adminError(error.response)))
        )
    )
)

export const getUserItemsEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(getUserItems.type),
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
                return getUserItemsSuccess({id: data.id, files: data.files, folders: data.folders, curentfolders: {id: data.id, folder_name: data.folder_name}} as StoragePayloadAction)
            }),
            catchError((error) => of(adminError(error.response)))
        )
    })
)

export const setFolderAdminEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(setCurrentFolderAdmin.type),
    map((action) => getUserItems(action.payload.folderId))
)