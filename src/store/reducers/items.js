// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [
    {
        id: '1',
        itemName: 'Test Item',
        ratePerUnit: 20,
        unit: 'kg'
    },
    {
        id: '2',
        itemName: 'Item 2',
        ratePerUnit: 100,
        unit: 'kg'
    }
];

// ==============================|| SLICE - Items ||============================== //

const items = createSlice({
    name: 'items',
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

export default items.reducer;

export const { addItem, removeItem } = items.actions;
