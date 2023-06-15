import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
  } from '../actions/action-type';
  
  export const login = data => ({type: LOGIN, data});
  export const loginSuccess = payload => ({type: LOGIN_SUCCESS, payload});
  export const loginError = error => ({type: LOGIN_ERROR, error});
  
  