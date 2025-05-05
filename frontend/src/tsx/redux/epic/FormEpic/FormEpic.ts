import { Epic, ofType } from "redux-observable";
import { RootAction, RootState } from "../../store/store";
import { createUser, createUserError, createUserSuccess, getUser, getUserError, getUserSuccess, logoutUser, logoutUserSuccess } from "../../slice/FormSlice/FormSlice";
import { catchError, map, mergeMap, of, Subject, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { UserInfo } from "../../../typing";
import { logoutUserStorage } from "../../slice/StorageSlice/StorageSlice";
import { logoutUserAdmin } from "../../slice/AdminSlice/AdminSlice";

export const registrationSubject = new Subject();

export const loginEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(getUser.type),
    switchMap((action) => ajax({
        url: `${import.meta.env.VITE_SERVER_URL}api/user/login/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: action.payload,
        withCredentials: true
    }).pipe(
        map((responseData) => getUserSuccess(responseData.response as UserInfo)),
        catchError(error => of(getUserError(error.response)))
    ))
)

export const registrationEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(createUser.type),
    switchMap((action) => ajax({
        url: `${import.meta.env.VITE_SERVER_URL}api/user/registration/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: action.payload,
    }).pipe(
        map(() => {
            registrationSubject.next(true)
            return createUserSuccess()
        }),
        catchError(error => {
            registrationSubject.next(false)
            return of(createUserError(error.response))
        })
    ))
)

export const logoutEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(logoutUser.type),
    switchMap(() => 
        ajax({
            url: `${import.meta.env.VITE_SERVER_URL}api/user/logout/`,
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            mergeMap(() => [logoutUserSuccess(), logoutUserStorage(), logoutUserAdmin()])
        )
    )
)
