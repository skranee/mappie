import type { AuthSlice, SignMode } from '@/types/store/auth.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthSlice = {
  signMode: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignMode: (state, action: PayloadAction<SignMode>) => {
      state.signMode = action.payload;
    },
  },
});

export const { setSignMode } = authSlice.actions;

export default authSlice.reducer;
