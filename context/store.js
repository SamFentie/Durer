import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
