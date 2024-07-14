import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import { addCrop, removeCrop, editCrop, fetchCrops } from 'store/reducers/actions';
import { setItems } from 'store/reducers/cropMasterReducer';
import { setLoading } from 'store/reducers/app';
import http from './http';

export function* handler() {
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'GET',
            // url: `CropMaster/GetCropName/${token}`
            url: `/CropMaster/`
        };
        yield put(setLoading(true));

        const { data: resp } = yield call(http, config);

        yield put(setItems(resp));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
    }
}

export function* addCropHandler({ payload }) {
    const { cropName, onSuccess, onFail } = payload;
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'POST',
            url: '/CropMaster/',
            data: {
                EncryptID: token,
                CropName: cropName,
                Flag: 0
            }
        };
        yield put(setLoading(true));
        yield call(http, config);
        yield put(fetchCrops());
        onSuccess && onSuccess();
        yield put(setLoading(false));
    } catch (error) {
        onFail && onFail();
        yield put(setLoading(false));
    }
}

export function* removeCropHandler({ payload }) {
    const { cropName, onSuccess, onFail } = payload;
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'POST',
            url: '/CropMaster/',
            data: {
                EncryptID: token,
                CropName: cropName,
                Flag: 2
            }
        };
        yield put(setLoading(true));
        yield call(http, config);
        yield put(fetchCrops());
        onSuccess && onSuccess();
        yield put(setLoading(false));
    } catch (error) {
        onFail && onFail();
        yield put(setLoading(false));
    }
}

export function* editCropHandler({ payload }) {
    try {
        yield put(setLoading(true));

        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
    }
}

export default function* () {
    yield all([
        takeLatest(fetchCrops, handler),
        takeLatest(addCrop, addCropHandler),
        takeLatest(removeCrop, removeCropHandler),
        takeLatest(editCrop, editCropHandler)
    ]);
}
