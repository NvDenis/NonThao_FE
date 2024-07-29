import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDrawer: false,
  menuMobile: false,
  modalAddProduct: false,
  modalLogin: false,
  modalRegister: false,
  modalAddCategory: false,
  modalEditCategory: false,
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
    toggleModalLogin: (state) => {
      state.modalLogin = !state.modalLogin;
    },
    toggleModalRegister: (state) => {
      state.modalRegister = !state.modalRegister;
    },
    toggleModalAddCategory: (state) => {
      state.modalAddCategory = !state.modalAddCategory;
    },
    toggleModalEditCategory: (state) => {
      state.modalEditCategory = !state.modalEditCategory;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleCartDrawer,
  toggleMenuMobile,
  toggleModalAddProduct,
  toggleModalLogin,
  toggleModalRegister,
  toggleModalAddCategory,
  toggleModalEditCategory,
} = toggleSlice.actions;

export default toggleSlice.reducer;
