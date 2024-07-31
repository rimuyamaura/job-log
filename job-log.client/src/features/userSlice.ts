import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

export interface UserState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: null,
  token: null,
  loading: false,
  error: null,
};

// Use Thunks to handle async API calls
export const loginUser = createAsyncThunk(
  'user/login',
  async (
    credentials: { userName: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/Auth/login', credentials);
      const { userName, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      return { userName, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('token');
  // Confirm the token removal
  const token = localStorage.getItem('token');
  if (token) {
    console.error('Failed to remove token from localStorage');
  } else {
    console.log('Token successfully removed');
  }
  return true;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.userName;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
    });
  },
});

export default userSlice.reducer;
