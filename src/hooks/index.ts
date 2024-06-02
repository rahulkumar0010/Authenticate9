import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from "../store"

/**
 * Custom hooks for typed Redux dispatch and state selection.
 * 
 * These hooks provide type safety and intellisense for working with the Redux store.
 * 
 * `useAppDispatch` returns a typed dispatch function that can be used to dispatch actions.
 * `useAppSelector` returns a typed selector function that can be used to select parts of the state.
 * 
 * Use these hooks throughout the app instead of the plain `useDispatch` and `useSelector` from `react-redux`.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()