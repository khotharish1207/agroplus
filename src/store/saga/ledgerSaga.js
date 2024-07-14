import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import { addLedger, fetchLedger } from 'store/reducers/actions';
import { setItems } from 'store/reducers/ledger';
import { setLoading } from 'store/reducers/app';
import http from './http';

export function* handler() {
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'GET',
            // url: `/LedgerMaster/GetLedgerName/${token}`
            url: `/LedgerMaster/`
        };
        yield put(setLoading(true));

        const { data: resp } = yield call(http, config);

        yield put(setItems(resp));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
    }
}

export function* addHandler({ payload }) {
    const { ledger, onSuccess, onFail } = payload;
    console.log(ledger);
    const [type, under, groupName] = (ledger?.ledgerType || '').split('-');
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'POST',
            url: '/LedgerMaster/',
            data: {
                EncryptID: token,
                LedgerName: ledger?.ledgerName,
                LedgerType: under, //under
                Address1: ledger?.ledgerAddress,
                OpeningBalance: ledger?.ledgerOpeningBalence,
                LedgerGorupName: groupName,
                NatureOfLedgers: type,
                Flag: 0
            }
        };
        yield put(setLoading(true));
        yield call(http, config);
        yield put(fetchLedger());
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
        takeLatest(fetchLedger, handler),
        takeLatest(addLedger, addHandler)
        // takeLatest(removePlot, removeHandler),
        // takeLatest(editPlot, editHandler)
    ]);
}
