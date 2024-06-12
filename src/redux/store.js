import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/features/counter/counterSlice";
import toggleReducer from "../redux/features/toggle/toggleSlice";
import userReducer from "../redux/features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toggle: toggleReducer,
    account: userReducer,
  },
});
