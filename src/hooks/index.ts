'use client';
import type { AppDispatch, AppState } from 'store';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
}                                     from 'react-redux';

// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export * from './title';

export * from './router';

export * from './cachedResources';