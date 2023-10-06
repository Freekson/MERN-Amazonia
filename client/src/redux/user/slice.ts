import { createSlice } from "@reduxjs/toolkit";
import { TUserAddress, UserState } from "./types";
import { TUser } from "../../types";

const data = localStorage.getItem("userInfo");
const userLS: TUser = data ? JSON.parse(data) : null;

const dataAddress = localStorage.getItem("userShippingAddress");
const userAddressLS: TUserAddress = dataAddress
  ? JSON.parse(dataAddress)
  : null;

const dataPayment = localStorage.getItem("paymentMethod");
const userPaymentLS: string = dataPayment ? dataPayment : "";

const initialState: UserState = {
  user: userLS,
  userAddress: userAddressLS,
  userPaymentMethod: userPaymentLS,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singIn(state, action) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.userAddress = null;
      state.userPaymentMethod = "";
    },
    saveShippingAddress(state, action) {
      state.userAddress = action.payload;
    },
    savePaymentMethod(state, action) {
      state.userPaymentMethod = action.payload;
    },
  },
});
export const { singIn, signOut, saveShippingAddress, savePaymentMethod } =
  userSlice.actions;
export default userSlice.reducer;
