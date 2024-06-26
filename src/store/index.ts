import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/watchList/listSlice";
import { moviesApi } from "../services/API";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
