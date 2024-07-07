import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addCartLocal: (state, action) => {
      if (action.payload.type == "add") {
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout, setLoading } = userSlice.actions;

export default userSlice.reducer;
