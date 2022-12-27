// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = [
    {
        name: 'dummy',
        mobile: '9800123456',
        address: 'awasri (kd)',
        gstNo: '1234567879',
        underType: 'bank a/c',
        openingBalence: '10000'
    }
];

// ==============================|| SLICE - Items ||============================== //

const accounts = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount(state, action) {
            state = [...state, action.payload];
            return state;
        },
        removeAccount(state, action) {
            state = state.filter((item) => item.id !== action.payload);
            return state;
        },
        setAccounts(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export default accounts.reducer;

export const { addAccount, removeAccount, setAccounts } = accounts.actions;
