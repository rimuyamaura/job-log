import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import JobApplicationReducer from './features/jobApplicationSlice';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    jobApplicationState: JobApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
