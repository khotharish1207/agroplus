import { all, call, put, select, takeLatest } from 'redux-saga/effects';
// import axios from "axios";

import { register } from 'store/reducers/actions';
import { setAuth, setUser } from 'store/reducers/app';

export function* handler() {
    try {
        yield put(setAuth(true));
    } catch (error) {
        yield put(setAuth(false));
    }
}

export default function* () {
    yield all([takeLatest(register, handler)]);
}
