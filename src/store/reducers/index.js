// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import items from './items';
import units from './units';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, items, units });

export default reducers;
