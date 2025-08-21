import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const storedAuth = localStorage.getItem("auth");
if (storedAuth) {
  const parsed = JSON.parse(storedAuth);
  initialState.status = true;
  initialState.user = parsed.user;
  initialState.accessToken = parsed.accessToken;
  initialState.refreshToken = parsed.refreshToken;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      // save to localStorage
      localStorage.setItem("auth", JSON.stringify({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }));

    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    rehydrate: (state, action) => {
      state.status = action.payload?.status ?? false;
      state.user = action.payload?.user ?? null;
      state.accessToken = action.payload?.accessToken ?? null;
      state.refreshToken = action.payload?.refreshToken ?? null;
    },
  },
});

export const { login, logout,rehydrate} = authSlice.actions;
export default authSlice.reducer;
