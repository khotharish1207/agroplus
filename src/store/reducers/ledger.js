// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [];

// ==============================|| SLICE - Items ||============================== //

const ledger = createSlice({
    name: 'ledger',
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

export default ledger.reducer;

export const { addItem, removeItem, setItems } = ledger.actions;
