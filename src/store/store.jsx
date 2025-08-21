import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
