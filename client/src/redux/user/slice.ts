import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TUserAddress,
  UserState,
  setUserProps,
  setMapLocationProps,
} from "./types";
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
    saveSippingMapLocation(state, action: PayloadAction<setMapLocationProps>) {
      if (state.userAddress) {
        state.userAddress.location = action.payload;
      }
    },
    savePaymentMethod(state, action) {
      state.userPaymentMethod = action.payload;
    },
    setUser(state, action: PayloadAction<setUserProps>) {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
      }
    },
  },
});
export const {
  singIn,
  signOut,
  saveShippingAddress,
  savePaymentMethod,
  setUser,
  saveSippingMapLocation,
} = userSlice.actions;
export default userSlice.reducer;
