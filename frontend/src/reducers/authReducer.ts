import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/auth';
import { Dispatch } from 'redux';
import { LoggedUser } from '../types';

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
    console.log(loggedUser);
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    dispatch(setUser(loggedUser));
  };
};

export const setReduxAuth = (user: LoggedUser) => {
  return async (dispatch: Dispatch) => {
    dispatch(setUser(user));
  };
};

export const setReduxLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
  };
};

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
