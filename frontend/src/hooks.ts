/**
     This file is used to create hooks for using redux in the application with TypeScript.
     - useAppDispatch: used to dispatch actions
     - useAppSelector: used to select state from the store    
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
