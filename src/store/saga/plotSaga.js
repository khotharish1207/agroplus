import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import { addPlot, editPlot, fetchPlot, removePlot } from 'store/reducers/actions';
import { setItems } from 'store/reducers/plot';
import { setLoading } from 'store/reducers/app';
import http from './http';

export function* handler() {
    try {
        const { token } = yield select((state) => state.app);
        const config = {
            method: 'GET',
            url: `/PlotMaster/GetPlotName/${token}`
            // url: `/PlotMaster`
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
    const { plot, onSuccess, onFail } = payload;
    console.log(plot);
    try {
        const { token } = yield select((state) => state.app);
        const [type, under, groupName] = (plot?.ledgerType || '').split('-');
        const config = {
            method: 'POST',
            url: '/PlotMaster',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                EncryptID: token,
                PlotName: plot?.plotName,
                LedgerType: under,
                Address1: plot?.plotAddress,
                Area: plot?.plotArea,
                OpeningBalance: plot?.plotOpeningBalence,
                LedgerGroupName: groupName,
                NatureOfGroup: type,
                Flag: 0
            }
        };
        yield put(setLoading(true));
        yield call(http, config);
        yield put(fetchPlot());
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
        takeLatest(fetchPlot, handler),
        takeLatest(addPlot, addHandler)
        // takeLatest(removePlot, removeHandler),
        // takeLatest(editPlot, editHandler)
    ]);
}
