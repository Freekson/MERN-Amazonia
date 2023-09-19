import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "./types";

const initialState: CartState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cartItems.push(action.payload);
    },
  },
});
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
