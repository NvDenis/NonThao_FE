import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    handleLogout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout } = userSlice.actions;

export default userSlice.reducer;
