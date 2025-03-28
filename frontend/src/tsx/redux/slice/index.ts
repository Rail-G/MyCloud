import { combineSlices } from "@reduxjs/toolkit";
import formSlices from './FormSlice/FormSlice'

export const combinedSlices = combineSlices({
    form: formSlices,
})