import { combineSlices } from "@reduxjs/toolkit";
import formSlices from './FormSlice/FormSlice'
import storageSlices from './StorageSlice/StorageSlice'
import fileSlice from './FileSlice/FileSlice'
import folderSlice from './FolderSlice/FolderSlice'

export const combinedSlices = combineSlices({
    form: formSlices,
    storage: storageSlices,
    file: fileSlice,
    folder: folderSlice
})