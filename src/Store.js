import { configureStore } from "@reduxjs/toolkit";
import searchTermSlice from "./ReduxState/SearchTerm";
export const store = configureStore({
    reducer: {
        searchTermSlice
    }
})