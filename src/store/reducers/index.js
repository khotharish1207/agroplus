// third-party
import { combineReducers } from 'redux';
// project import
import accounts from './accounts';
import app from './app';
import items from './items';
import menu from './menu';
import units from './units';
import crop from './cropMasterReducer';
import plot from './plot';
import ledger from './ledger';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, items, units, app, accounts, crop, plot, ledger });

export default reducers;
