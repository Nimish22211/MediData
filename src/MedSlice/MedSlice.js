import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

const MedSlice = createSlice({
    name: 'MedSlice',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // state.items.push(action.payload)
            if (state.items.length === 0) {
                state.items.push({ ...action.payload, quantity: 1 })
            } else {
                if (state.items.some((item) => item.id === action.payload.id)) {
                    // console.log(arr.find(item => item.id === action.payload.id));
                    let ans = state.items.find(item => item.id === action.payload.id);
                    ans.quantity++
                } else {
                    state.items.push({ ...action.payload, quantity: 0 })
                }
            }
        },
        removeItem: (state, action) => {
            state.items.splice(action.payload, 1)
        },
        removeAllItem: (state, action) => {
            state.items = []
        }
    }
});

export const {
    addItem,
    removeItem,
    removeAllItem
} = MedSlice.actions

export const itemsLength = state => state.MedSlice.items.length;
export let itemsQuant = state => state.MedSlice.items
export default MedSlice.reducer