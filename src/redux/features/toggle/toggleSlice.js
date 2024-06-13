import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDrawer: false,
  menuMobile: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawer = !state.cartDrawer;
    },
    toggleMenuMobile: (state) => {
      state.menuMobile = !state.menuMobile;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleCartDrawer, toggleMenuMobile } = toggleSlice.actions;

export default toggleSlice.reducer;
