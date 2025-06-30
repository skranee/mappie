import type { LatLngExpression } from 'leaflet';

import { DEFAULT_LOCATION } from '@/constants/Location.ts';
import type { Landmark } from '@/types/landmark.ts';
import type { MapSlice } from '@/types/store/map.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: MapSlice = {
  radius: 1000,
  categories: [],
  location: DEFAULT_LOCATION,
  landmarks: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setRadius: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
    addCategories: (state, action: PayloadAction<string[]>) => {
      state.categories.push(...action.payload);
    },
    removeCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = state.categories.filter(c => !action.payload.includes(c));
    },
    setLocation: (state, action: PayloadAction<LatLngExpression>) => {
      state.location = action.payload;
    },
    setLandmarks: (state, action: PayloadAction<Landmark[]>) => {
      state.landmarks = action.payload;
    },
  },
});

export const { setRadius, addCategories, removeCategories, setLocation, setLandmarks } =
  mapSlice.actions;

export default mapSlice.reducer;
