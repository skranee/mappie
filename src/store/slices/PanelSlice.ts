import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PanelMode, PanelSlice } from '@/types/store/panel.ts';

const initialState: PanelSlice = {
  isOpen: false,
  mode: 'search',
};

export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },

    setMode: (state, action: PayloadAction<PanelMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setIsOpen, setMode } = panelSlice.actions;

export default panelSlice.reducer;
