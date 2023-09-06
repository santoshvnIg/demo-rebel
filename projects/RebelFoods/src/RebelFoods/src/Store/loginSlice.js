import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    saveToken: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveToken } = tokenSlice.actions;

export default tokenSlice.reducer;