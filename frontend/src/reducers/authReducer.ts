import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/auth';
import { Dispatch } from 'redux';
import { LoggedUser } from '../types';
import productsService from '../services/products';
import companiesService from '../services/companies';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const setReduxLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const loggedUser = await loginService.login({ email, password });
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    dispatch(setUser(loggedUser));
  };
};

export const getReduxAuth = () => {
  return async (dispatch: Dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser: LoggedUser = JSON.parse(loggedUserJSON);
      productsService.setToken(loggedUser.token);
      companiesService.setToken(loggedUser.token);
      dispatch(setUser(loggedUser));
    }
  };
};

export const setReduxLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
    window.localStorage.removeItem('loggedUser');
  };
};

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
