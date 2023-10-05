import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { TUser } from "../../types";

const data = localStorage.getItem("userInfo");
const userTS: TUser = data ? JSON.parse(data) : null;

const initialState: UserState = {
  user: userTS,
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
    },
  },
});
export const { singIn, signOut } = userSlice.actions;
export default userSlice.reducer;
