import { Slice, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredential: (state: AuthState, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    removeCredential: (state: AuthState, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setError: (state: AuthState, action) => {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
