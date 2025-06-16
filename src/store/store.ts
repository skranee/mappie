import { configureStore } from '@reduxjs/toolkit';
import panelReducer from '@/store/slices/PanelSlice.ts';
import userReducer from '@/store/slices/UserSlice.ts';

export const store = configureStore({
  reducer: {
    panel: panelReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
