import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

import { fetchCrops, fetchLedger, fetchPlot } from 'store/reducers/actions';

// ============//

console.log(store);
setTimeout(() => {
    store.dispatch(fetchCrops());
    store.dispatch(fetchLedger());
    store.dispatch(fetchPlot());
    console.log('dispatched');
}, 1000);

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <HashRouter basename="/">
                <App />
            </HashRouter>
        </ReduxProvider>
    </StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
