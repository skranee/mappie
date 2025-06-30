import type { Landmark } from '@/types/landmark.ts';
import type { FavoritesSlice } from '@/types/store/favorites.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: FavoritesSlice = {
  email: '',
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    addFavorite: (state, action: PayloadAction<Landmark>) => {
      if (state.favorites.filter(item => item.name === action.payload.name).length > 0) {
        return;
      }

      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Landmark>) => {
      state.favorites = state.favorites.filter(item => item.name !== action.payload.name);
    },
  },
});

export const { setEmail, addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
