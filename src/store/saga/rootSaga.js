import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import cropSaga from './cropSaga';
import plotSaga from './plotSaga';
import ledgersaga from './ledgerSaga';
import registerSaga from './registerSaga';

function* rootSaga() {
    yield all([loginSaga(), cropSaga(), registerSaga(), plotSaga(), ledgersaga()]);
}

export default rootSaga;
