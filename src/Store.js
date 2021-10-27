import { configureStore } from "@reduxjs/toolkit";
import MedSlice from "./MedSlice/MedSlice";
export const store = configureStore({
    reducer: {
        MedSlice
    }
})