// third-party
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// project import
import reducers from './reducers';
import rootSaga from './saga/rootSaga';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.onSuccess', 'payload.onFail']
            }
        }).concat(middleware)
});

sagaMiddleware.run(rootSaga);

const { dispatch } = store;

export { store, dispatch };
