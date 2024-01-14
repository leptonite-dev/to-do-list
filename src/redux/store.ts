import { configureStore } from "@reduxjs/toolkit";
import toDosReducer from "../features/toDos/toDosSlice";

const reducer = { toDos: toDosReducer };

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
