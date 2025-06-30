import type { AppSlice } from '@/types/store/app.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AppSlice = {
  isLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
