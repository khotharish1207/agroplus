// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [
    { id: 0, label: 'Bags', value: 'bags' },
    { id: 1, label: 'Bottols', value: 'bottols' },
    { id: 2, label: 'Box', value: 'box' },
    { id: 3, label: 'Bundles', value: 'bundles' },
    { id: 4, label: 'Cans', value: 'cans' },
    { id: 5, label: 'Cartons', value: 'cartons' },
    { id: 6, label: 'Dozens', value: 'dozens' },
    { id: 7, label: 'Grammes', value: 'grammes' },
    { id: 8, label: 'Kilograms', value: 'kilograms' },
    { id: 9, label: 'Litre', value: 'litre' },
    { id: 10, label: 'Meters', value: 'meters' },
    { id: 11, label: 'Mililitre', value: 'mililitre' },
    { id: 12, label: 'Numbers', value: 'numbers' },
    { id: 13, label: 'Packs', value: 'packs' },
    { id: 14, label: 'Pairs', value: 'pairs' },
    { id: 15, label: 'Pieces', value: 'pieces' },
    { id: 16, label: 'Quintal', value: 'quintal' },
    { id: 17, label: 'Rolls', value: 'rolls' },
    { id: 18, label: 'Square Feet', value: 'squareFeet' },
    { id: 19, label: 'Square Meters', value: 'squareMeters' },
    { id: 20, label: 'Tablets', value: 'tablets' }
];

// ==============================|| SLICE - Units ||============================== //

const units = createSlice({
    name: 'units',
    initialState,
    reducers: {
        addUnit(state, action) {
            state = [...state, action.payload];
            return state;
        },
        removeUnit(state, action) {
            state = state.filter((item) => item.id !== action.payload);
            return state;
        },
        setUnits(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export default units.reducer;

export const { addUnit, removeUnit, setUnits } = units.actions;
