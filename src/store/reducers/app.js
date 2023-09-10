// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    auth: localStorage.getItem('agroplus-auth') === 'true',
    user: {},
    token: ''
};

// ==============================|| SLICE - App ||============================== //

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAuth(state, action) {
            state = { ...state, auth: action.payload };
            return state;
        },
        setUser(state, action) {
            state = { ...state, user: action.payload };
            return state;
        },
        setToken(state, action) {
            state = { ...state, token: action.payload };
            return state;
        }
    }
});

export default app.reducer;

export const { setAuth, setUser, setToken } = app.actions;
