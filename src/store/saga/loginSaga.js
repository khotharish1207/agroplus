import { all, call, put, takeLatest } from 'redux-saga/effects';
import { login, logout } from 'store/reducers/actions';
import { setAuth, setLoading, setToken } from 'store/reducers/app';
import Cookies from 'universal-cookie';
import http from './http';

const cookies = new Cookies();

export function* handler({ payload }) {
    const {
        onSuccess,
        onFail,
        data: { password, mobile }
    } = payload;
    try {
        const config = {
            method: 'GET',
            url: `/Register/GetLogin/${mobile}/${password}`
        };
        yield put(setLoading(true));

        const { data: resp } = yield call(http, config);
        console.log(resp);

        // localStorage.setItem('agroplus-auth', true);
        yield put(setAuth(true));
        yield put(setToken(resp));

        cookies.set('agroplus-token', resp, { path: '/' });

        window.localStorage.setItem('agroplus-token', resp);

        yield put(setLoading(false));

        onSuccess && onSuccess();
    } catch (error) {
        yield put(setAuth(false));
        yield put(setLoading(false));

        onFail && onFail(error);
    }
}

export function* logoutHandler() {
    try {
        localStorage.removeItem('agroplus-auth');
        cookies.remove('agroplus-token');

        yield put(setAuth(false));
        yield put(setToken(''));
    } catch (error) {
        yield put(setAuth(false));
    }
}

export default function* () {
    yield all([takeLatest(login, handler), takeLatest(logout, logoutHandler)]);
}
