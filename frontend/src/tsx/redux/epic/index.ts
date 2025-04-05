import { combineEpics } from "redux-observable";
import { loginEpic, logoutEpic, registrationEpic } from "./FormEpic/FormEpic";
import { setFolderEpic, storageEpic } from "./StorageEpic/StorageEpic";
import { deleteFileEpic, shareFileEpic, changeFileEpic, downloadFileEpic } from "./FileEpic/FileEpic";
import { addFolderEpic, deleteFolderEpic, editFolderEpic } from "./FolderEpic/FolderEpic";
import { adminGetEpic, adminDeleteEpic, adminEditEpic } from "./AdminEpic/AdminEpic";

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
    deleteFolderEpic,
    adminGetEpic,
    adminDeleteEpic,
    adminEditEpic
)