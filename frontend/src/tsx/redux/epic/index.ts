import { combineEpics } from "redux-observable";
import { loginEpic, logoutEpic, registrationEpic } from "./FormEpic/FormEpic";
import { setFolderEpic, storageEpic } from "./StorageEpic/StorageEpic";
import { deleteFileEpic, shareFileEpic, changeFileEpic, downloadFileEpic } from "./FileEpic/FileEpic";
import { addFolder } from "../slice/FolderSlice/FolderSlice";
import { addFolderEpic, deleteFolderEpic, editFolderEpic } from "./FolderEpic/FolderEpic";

export const combinedEpic = combineEpics(
    loginEpic,
    registrationEpic,
    logoutEpic,
    storageEpic,
    setFolderEpic,
    deleteFileEpic,
    shareFileEpic,
    changeFileEpic,
    downloadFileEpic,
    addFolderEpic,
    editFolderEpic,
    deleteFolderEpic
)