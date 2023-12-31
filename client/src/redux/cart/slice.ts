import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";

const { cartItems } = getCartFromLS();

const initialState: CartState = {
  cartItems,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const inCart = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (inCart) {
        if (inCart.countInStock <= inCart.quantity) {
          window.alert("Sorry, product is out of the stock");
          return;
        } else {
          inCart.quantity = inCart ? inCart.quantity + 1 : 1;
        }
      }
      if (!inCart) {
        state.cartItems.push(action.payload);
      }
    },
    minusItem(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity -= 1;
      }
    },
    deleteItem(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        state.cartItems = state.cartItems.filter(
          (el) => el._id !== action.payload._id
        );
      }
    },
    clear(state) {
      state.cartItems = [];
    },
  },
});
export const { addItem, minusItem, deleteItem, clear } = cartSlice.actions;
export default cartSlice.reducer;
