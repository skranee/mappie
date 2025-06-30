import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from '@/store/slices/AppSlice.ts';
import authReducer from '@/store/slices/AuthSlice.ts';
import favoritesReducer from '@/store/slices/FavoritesSlice.ts';
import mapReducer from '@/store/slices/MapSlice.ts';
import panelReducer from '@/store/slices/PanelSlice.ts';
import routeReducer from '@/store/slices/RouteSlice.ts';
import userReducer from '@/store/slices/UserSlice.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  panel: panelReducer,
  user: userReducer,
  auth: authReducer,
  map: mapReducer,
  favorites: favoritesReducer,
  app: appReducer,
  route: routeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
