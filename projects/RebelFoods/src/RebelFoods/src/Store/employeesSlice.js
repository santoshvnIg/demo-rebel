import { createSlice } from '@reduxjs/toolkit';

const EmployeesStatusSlice = createSlice({
  name: 'status',
  initialState: null,
  reducers: {
    saveEmployeesdata: (state, action) => {
      return action.payload;
    },
  },
});

export const {   saveEmployeesdata } = EmployeesStatusSlice .actions;

export default EmployeesStatusSlice .reducer;