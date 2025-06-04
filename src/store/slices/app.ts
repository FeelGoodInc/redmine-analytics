import {
  createSlice,
  PayloadAction,
}                           from '@reduxjs/toolkit';

interface AppState {
  mobileMenuOpened: boolean;
  menuOpened: boolean;
}

const initialState: AppState = {
  mobileMenuOpened: false,
  menuOpened: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    
    setMobileMenuOpened: (state, action: PayloadAction<boolean>) => {
      /* eslint-disable-next-line no-param-reassign */
      state.mobileMenuOpened = action.payload;
    },
    setMenuOpened: (state, action: PayloadAction<boolean>) => {
      /* eslint-disable-next-line no-param-reassign */
      state.menuOpened = action.payload;
    },
  },
});

export const {
  setMobileMenuOpened,
  setMenuOpened,
} = appSlice.actions;

export default appSlice.reducer;