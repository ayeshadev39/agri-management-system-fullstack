import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { activityLogger } from "../middleware/activityLogger";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(activityLogger),
  devTools: true,
});