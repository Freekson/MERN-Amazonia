import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productReducer from "./product/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
