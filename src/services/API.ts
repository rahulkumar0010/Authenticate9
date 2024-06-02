// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetMoviesType } from "../type";
import { omdbBASE } from "../config";

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: omdbBASE }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesType, string>({
      query: (query) => `?${query}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = moviesApi;
