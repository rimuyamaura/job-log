import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import { Status } from '../assets/statusEnum';

export interface JobApplication {
  id: number;
  position: string;
  company: string;
  status: Status;
  location: string;
  salary: string;
  url: string;
  notes: string;
  updatedAt: string;
}

export interface JobApplicationState {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
}

const initialState: JobApplicationState = {
  applications: [],
  loading: false,
  error: null,
};

// Use Thunks to handle async API calls
export const fetchJobApplications = createAsyncThunk(
  'jobApplications/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/JobApplication');
      return response.data as JobApplication[];
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch job applications');
    }
  }
);

export const createJobApplication = createAsyncThunk(
  'jobApplications/create',
  async (jobApplication: Omit<JobApplication, 'id'>, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        '/JobApplication',
        jobApplication
      );
      return response.data as JobApplication;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create job application');
    }
  }
);

export const updateJobApplication = createAsyncThunk(
  'jobApplications/update',
  async (jobApplication: JobApplication, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/JobApplication/${jobApplication.id}`,
        jobApplication
      );
      return response.data as JobApplication;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update job application');
    }
  }
);

export const removeJobApplication = createAsyncThunk(
  'jobApplications/remove',
  async (id: number, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/JobApplication/${id}`);
      return { id, message: response.data as string };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to remove job application');
    }
  }
);

// Selectors to return derived state
const selectApplications = (state: {
  jobApplicationState: JobApplicationState;
}) => state.jobApplicationState.applications;

// Get count of all applications
export const selectTotalApplications = createSelector(
  [selectApplications],
  (applications) => applications.length
);

// Get count of applications by status
const selectStatusCounts = createSelector(
  [selectApplications],
  (applications) => {
    const counts: Record<Status, number> = {
      [Status.Wishlist]: 0,
      [Status.Applied]: 0,
      [Status.Interviewing]: 0,
      [Status.OfferReceived]: 0,
      [Status.Rejected]: 0,
      [Status.Ghosted]: 0,
    };
    applications.forEach((app) => {
      counts[app.status]++;
    });
    return counts;
  }
);

export const jobApplicationSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch job applications
    builder.addCase(fetchJobApplications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchJobApplications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create job applications
    builder.addCase(createJobApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createJobApplication.fulfilled, (state, action) => {
      state.applications.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update job applications
    builder.addCase(updateJobApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateJobApplication.fulfilled, (state, action) => {
      state.applications = state.applications.map((app) =>
        app.id === action.payload.id ? action.payload : app
      );
      state.loading = false;
    });
    builder.addCase(updateJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Remove job applications
    builder.addCase(removeJobApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeJobApplication.fulfilled, (state, action) => {
      state.applications = state.applications.filter(
        (app) => app.id !== action.payload.id
      );
      state.loading = false;
    });
    builder.addCase(removeJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default jobApplicationSlice.reducer;

export const jobApplicationSelectors = {
  selectTotalApplications,
  selectStatusCounts,
};
