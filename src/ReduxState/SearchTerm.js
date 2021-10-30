import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchTerm: ''
}

const searchTermSlice = createSlice({
    name: 'searchTermSlice',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        }
    }
});

export const {
    setSearchTerm
} = searchTermSlice.actions

export const selectSearchTerm = state => state.searchTermSlice.searchTerm

export default searchTermSlice.reducer