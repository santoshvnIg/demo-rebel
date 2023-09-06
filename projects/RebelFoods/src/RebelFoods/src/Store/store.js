import { configureStore } from '@reduxjs/toolkit';
import userReducer from './loginSlice';
import employeesSlice from './employeesSlice';

const store = configureStore({
  reducer: {
    token: userReducer,
    employeesDetails:employeesSlice
  },
});

export default store;