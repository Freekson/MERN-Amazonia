import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OrderParams,
  OrdersParams,
  OrderState,
  Status,
  UpdatedOrder,
} from "./types";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  status: Status.LOADING,
};

export const fetchOrder = createAsyncThunk<UpdatedOrder, OrderParams>(
  "order/fetchOrderStatus",
  async ({ orderId, token }) => {
    const { data } = await axios.get<UpdatedOrder>(`/api/orders/${orderId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const fetchOrders = createAsyncThunk<UpdatedOrder[], OrdersParams>(
  "orders/fetchOrdersStatus",
  async ({ token }) => {
    const { data } = await axios.get<UpdatedOrder[]>(`/api/orders/mine`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const fetchAdminOrders = createAsyncThunk<UpdatedOrder[], OrdersParams>(
  "orders/fetchAdminOrdersStatus",
  async ({ token }) => {
    const { data } = await axios.get<UpdatedOrder[]>(`/api/orders`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const deliverOrder = createAsyncThunk<UpdatedOrder, OrderParams>(
  "order/deliverStatus",
  async ({ orderId, token }) => {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);

const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<UpdatedOrder[]>) {
      state.orders = action.payload;
    },
    setIsPaid(state, action: PayloadAction<string>) {
      const foundOrder = state.orders.find(
        (item) => item._id === action.payload
      );
      if (foundOrder) {
        foundOrder.isPaid = true;
      }
    },
  },
  extraReducers: (builder) => {
    //?fetch order
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
    //?fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.orders = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.orders = [];
      state.status = Status.ERROR;
    });
    //?fetch admin orders
    builder.addCase(fetchAdminOrders.pending, (state) => {
      state.orders = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAdminOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAdminOrders.rejected, (state) => {
      state.orders = [];
      state.status = Status.ERROR;
    });
    //?deliver order
    builder.addCase(deliverOrder.pending, (state) => {
      state.orders = [];
      state.status = Status.LOADING;
    });
    builder.addCase(deliverOrder.fulfilled, (state, action) => {
      state.orders[0] = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(deliverOrder.rejected, (state) => {
      state.orders = [];
      state.status = Status.ERROR;
    });
  },
});
export const { setItems, setIsPaid } = orderSlice.actions;
export default orderSlice.reducer;
