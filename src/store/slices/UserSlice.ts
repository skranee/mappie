import type { UserSlice } from '@/types/store/user.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSlice = {
  email: sessionStorage.getItem('email'),
  avatar: sessionStorage.getItem('avatar'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string | null>) {
      sessionStorage.setItem('email', action.payload || '');
      state.email = action.payload;
    },
    setAvatar(state, action: PayloadAction<string | null>) {
      sessionStorage.setItem('avatar', action.payload || '');
      state.avatar = action.payload;
    },
  },
});

export const { setEmail, setAvatar } = userSlice.actions;

export default userSlice.reducer;
