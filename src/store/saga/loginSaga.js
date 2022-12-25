import { all, call, put, select, takeLatest } from 'redux-saga/effects';
// import axios from "axios";

import { login, logout } from 'store/reducers/actions';
import { setAuth, setUser } from 'store/reducers/app';

export function* handler() {
    try {
        // const config = {
        //     method: 'GET',
        //     url: `url`
        // };
        // const { data } = yield call(axios, config);
        localStorage.setItem('agroplus-auth', true);
        yield put(setAuth(true));
    } catch (error) {
        yield put(setAuth(false));
    }
}

export function* logoutHandler() {
    try {
        localStorage.removeItem('agroplus-auth');
        yield put(setAuth(false));
    } catch (error) {
        yield put(setAuth(false));
    }
}

export default function* () {
    yield all([takeLatest(login, handler), takeLatest(logout, logoutHandler)]);
}
