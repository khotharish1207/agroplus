import { createAction } from '@reduxjs/toolkit';

// action - account reducer
export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';
export const REGISTER = 'auth/REGISTER';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const register = createAction(REGISTER);

/**
 * Crop actions
 */
export const addCrop = createAction('ADD_CROP');
export const removeCrop = createAction('REMOVE_CROP');
export const editCrop = createAction('EDIT_CROP');
export const fetchCrops = createAction('FETCH_CROP');

/**
 * plot action
 */

export const addPlot = createAction('ADD_PLOT');
export const removePlot = createAction('REMOVE_PLOT');
export const editPlot = createAction('EDIT_PLOT');
export const fetchPlot = createAction('FETCH_PLOT');

/**
 * ledger
 */

export const addLedger = createAction('ADD_LEDGER');
export const removeLedger = createAction('REMOVE_LEDGER');
export const editLedger = createAction('EDIT_LEDGER');
export const fetchLedger = createAction('FETCH_LEDGER');
