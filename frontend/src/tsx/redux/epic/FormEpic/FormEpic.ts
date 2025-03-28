import { Epic, ofType } from "redux-observable";
import { RootAction, RootState } from "../../store/store";
import { createUser, createUserError, createUserSuccess, getUser, getUserError, getUserSuccess, logoutUser, logoutUserSuccess } from "../../slice/FormSlice/FormSlice";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { UserInfo } from "../../../typing";

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
        map((responseData) => createUserSuccess(responseData.response as UserInfo)),
        catchError(error => of(createUserError(error.response)))
    ))
)

export const logoutEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(logoutUser.type),
    switchMap(() => 
        ajax({
            url: `${import.meta.env.VITE_SERVER_URL}/api/user/logout/`,
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }).pipe(
            map(() => logoutUserSuccess())
        )
    )
)