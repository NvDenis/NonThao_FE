import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
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
    addToCart: (state, action) => {
      const findProduct = state.user.cart.find((item) => item._id === action.payload._id);
      if (findProduct) {
        findProduct.quantity += action.payload.quantity;
      } else {
        state.user.cart.push(action.payload);
      }
    },
    // updateCart: (state, action) => {
    //   const findProduct = state.user.cart.find((item) => item._id === action.payload._id);
    //   if (findProduct) {
    //     findProduct.quantity = action.payload.quantity;
    //   }
    // },
    updateCart: (state, action) => {
      state.user.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout, setLoading, addToCart, updateCart } = userSlice.actions;

export default userSlice.reducer;
