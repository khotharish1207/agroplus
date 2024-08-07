// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [];

// ==============================|| SLICE - Items ||============================== //

const crop = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        addItem(state, action) {
            state = [...state, action.payload];
            return state;
        },
        removeItem(state, action) {
            state = state.filter((item) => item.id !== action.payload);
            return state;
        },
        setItems(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export default crop.reducer;

export const { addItem, removeItem, setItems } = crop.actions;
