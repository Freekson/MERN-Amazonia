import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderParams, OrderState, Status } from "./types";
import { IOrder } from "../../types";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  status: Status.LOADING,
};

export const fetchOrder = createAsyncThunk<IOrder, OrderParams>(
  "pizza/fetchOrderStatus",
  async ({ orderId, token }) => {
    const { data } = await axios.get<IOrder>(`/api/orders/${orderId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.orders = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orders[0] = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.orders = [];
      state.status = Status.ERROR;
    });
  },
});
export const { setItems } = orderSlice.actions;
export default orderSlice.reducer;
