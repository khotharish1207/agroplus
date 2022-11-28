// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [
    {
        id: '1',
        itemName: 'Test Item',
        conversionRate: 20,
        unit: 'bags',
        secondaryUnit: 'kilograms'
    },
    {
        id: '2',
        itemName: 'Item 2',
        conversionRate: 1000,
        unit: 'kilograms',
        secondaryUnit: 'grammes'
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

export const { addItem, removeItem, setItems } = items.actions;
