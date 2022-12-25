// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import items from './items';
import units from './units';
import app from './app';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, items, units, app });

export default reducers;
