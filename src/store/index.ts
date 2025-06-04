import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer                              from './slices/app';
import cachedResourcesReducer                  from './slices/cachedResources';

// eslint-disable-next-line
export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      cachedResources: cachedResourcesReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;