import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedin: boolean;
  user: { id: string; email: string };
}

const initialState: AuthState = {
  isLoggedin: false,
  user: { id: "", email: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loging: (state, action: PayloadAction<any>) => {
      state.isLoggedin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = { id: "", email: "" };
      localStorage.removeItem("user");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loging, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
