import { createAction } from '@reduxjs/toolkit';

// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

export const ADD_CROP = createAction('ADD_CROP');

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const register = createAction(REGISTER);
