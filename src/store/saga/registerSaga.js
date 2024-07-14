import { all, call, put, takeLatest } from 'redux-saga/effects';
import { register } from 'store/reducers/actions';
import { setLoading } from 'store/reducers/app';
import http from './http';

export function* handler({ payload }) {
    const { values, onSuccess, onFail } = payload;
    try {
        const config = {
            method: 'POST',
            url: '/register',
            data: {
                MobNo: values.mobile,
                Password1: values.password,
                FirstName: values.firstname,
                LastName: values.lastname,
                Address1: 'test address',
                EmailId: values.email,
                FarmName: values.farm,
                Flag: 0
            }
        };
        yield put(setLoading(true));
        yield call(http, config);

        onSuccess && onSuccess();
        yield put(setLoading(false));
    } catch (error) {
        onFail && onFail(error);
        yield put(setLoading(false));
    }
}

export default function* () {
    yield all([takeLatest(register, handler)]);
}
