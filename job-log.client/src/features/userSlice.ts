import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { RootState } from '../store';

import axiosInstance from './axiosInstance';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    username: null as string | null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  userSlice.actions;
export default userSlice.reducer;

// Define async thunks
export const loginUser =
  (credentials: {
    username: string;
    password: string;
  }): ThunkAction<void, RootState, unknown, PayloadAction<any>> =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post('/api/Auth/login', credentials);
      const { username, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      dispatch(loginSuccess({ username, token }));
    } catch (error: any) {
      const errorMessage =
        (error as { response?: { data: { message: string } } })?.response?.data
          ?.message || 'Login failed';
      dispatch(loginFail(errorMessage));
    }
  };

export const logoutUser =
  (): ThunkAction<void, RootState, unknown, any> => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
