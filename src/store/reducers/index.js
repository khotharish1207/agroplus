// third-party
import { combineReducers } from 'redux';
// project import
import accounts from './accounts';
import app from './app';
import items from './items';
import menu from './menu';
import units from './units';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, items, units, app, accounts });

export default reducers;
