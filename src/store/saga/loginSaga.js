import { all, put, takeLatest } from 'redux-saga/effects';
import { login, logout } from 'store/reducers/actions';
import { setAuth, setToken } from 'store/reducers/app';

export function* handler() {
    try {
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
        yield put(setToken(''));
    } catch (error) {
        yield put(setAuth(false));
    }
}

export default function* () {
    yield all([takeLatest(login, handler), takeLatest(logout, logoutHandler)]);
}
