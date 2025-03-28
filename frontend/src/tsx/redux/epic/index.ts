import { combineEpics } from "redux-observable";
import { loginEpic, logoutEpic, registrationEpic } from "./FormEpic/FormEpic";

export const combinedEpic = combineEpics(
    loginEpic,
    registrationEpic,
    logoutEpic
)