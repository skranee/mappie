import type { LatLngExpression } from 'leaflet';

import type { RouteSlice } from '@/types/store/route.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: RouteSlice = {
  from: undefined,
  to: undefined,
  fromName: undefined,
  toName: undefined,
  distance: undefined,
  duration: undefined,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setFrom: (state: RouteSlice, action: PayloadAction<LatLngExpression>) => {
      state.from = action.payload;
    },
    setTo: (state: RouteSlice, action: PayloadAction<LatLngExpression>) => {
      state.to = action.payload;
    },
    setFromName: (state: RouteSlice, action: PayloadAction<string>) => {
      state.fromName = action.payload;
    },
    setToName: (state: RouteSlice, action: PayloadAction<string>) => {
      state.toName = action.payload;
    },
    setDistance: (state: RouteSlice, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setDuration: (state: RouteSlice, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    reset: (state: RouteSlice) => {
      state.fromName = undefined;
      state.toName = undefined;
      state.distance = undefined;
      state.duration = undefined;
      state.from = undefined;
      state.to = undefined;
    },
  },
});

export const { setFrom, setTo, setDistance, setDuration, setFromName, setToName, reset } =
  routeSlice.actions;

export default routeSlice.reducer;
