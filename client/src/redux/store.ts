import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productReducer from "./product/slice";
import userReducer from "./user/slice";
import orderReducer from "./order/slice";
import categoryReducer from "./category/slice";
import dashboardReducer from "./dashboard/slice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    orders: orderReducer,
    category: categoryReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
