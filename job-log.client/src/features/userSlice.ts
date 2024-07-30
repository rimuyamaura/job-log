import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
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
      action: PayloadAction<{ userName: string; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.userName;
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
    userName: string;
    password: string;
  }): ThunkAction<void, RootState, unknown, PayloadAction<any>> =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post('/Auth/login', credentials);
      const { userName, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      dispatch(loginSuccess({ userName, token }));
    } catch (error: any) {
      const errorMessage =
        error.response.data || // Error message from server
        'Login failed'; // Alternative error message
      dispatch(loginFail(errorMessage));
    }
  };

export const logoutUser =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
    console.log('Logged out');

    // Confirm the token removal
    const token = localStorage.getItem('token');
    if (token) {
      console.error('Failed to remove token from localStorage');
    } else {
      console.log('Token successfully removed');
    }
  };
