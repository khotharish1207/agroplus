// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import items from './items';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, items });

export default reducers;
