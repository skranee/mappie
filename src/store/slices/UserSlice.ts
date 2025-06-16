import type { UserSlice } from '@/types/store/user.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSlice = {
  email: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string | null>) {
      state.email = action.payload;
    },
    setAvatar(state, action: PayloadAction<string | null>) {
      state.avatar = action.payload;
    },
  },
});

export const { setEmail, setAvatar } = userSlice.actions;

export default userSlice.reducer;
