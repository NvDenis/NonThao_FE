import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDrawer: false,
  menuMobile: false,
  modalAddProduct: false,
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
    toggleModalAddProduct: (state) => {
      state.modalAddProduct = !state.modalAddProduct;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleCartDrawer, toggleMenuMobile, toggleModalAddProduct } = toggleSlice.actions;

export default toggleSlice.reducer;
