// types
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// initial state
const initialState = {
    auth: localStorage.getItem('agroplus-auth') === 'true',
    user: {},
    token: cookies.get('agroplus-token') || '',
    loading: false
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
        },
        setLoading(state, action) {
            state = { ...state, loading: action.payload };
            return state;
        }
    }
});

export default app.reducer;

export const { setAuth, setUser, setToken, setLoading } = app.actions;
