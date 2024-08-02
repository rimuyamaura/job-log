import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface UserState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isDarkMode: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: null,
  token: null,
  user: null,
  loading: false,
  error: null,
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
};

// Use Thunks to handle async API calls
export const loginUser = createAsyncThunk(
  'user/login',
  async (
    credentials: { userName: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/Auth/login', credentials);
      const { userName, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage

      dispatch(getUser()); // Fetch user data after login

      return { userName, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const getUser = createAsyncThunk('user/get', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/Auth/user');
    return response.data as User;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch user');
  }
});

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
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', state.isDarkMode.toString());
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
      localStorage.setItem('isDarkMode', action.payload.toString());
    },
  },
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

    // Get user details
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.user = null;
    });
  },
});

export const { toggleTheme, setTheme } = userSlice.actions;
export default userSlice.reducer;
