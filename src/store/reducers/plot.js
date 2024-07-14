// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [];

// ==============================|| SLICE - Items ||============================== //

const plot = createSlice({
    name: 'plot',
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

export default plot.reducer;

export const { addItem, removeItem, setItems } = plot.actions;
