import { configureStore } from '@reduxjs/toolkit';

import studentReducer from '../app/features/students/studentSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,   // root reducer
  },
});