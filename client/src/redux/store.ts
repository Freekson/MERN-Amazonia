import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productReducer from "./product/slice";
import userReducer from "./user/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
