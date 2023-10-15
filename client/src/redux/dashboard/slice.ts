import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, DashboardParams, DashboardState, IDashboard } from "./types";
import axios from "axios";

const initialState: DashboardState = {
  summary: {
    orders: [],
    users: [],
  },
  status: Status.LOADING,
};

export const fetchDashboard = createAsyncThunk<IDashboard, DashboardParams>(
  "dashboard/fetchDashboard",
  async ({ token }) => {
    const { data } = await axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IDashboard>) {
      state.summary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state) => {
      state.summary = initialState.summary;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.summary = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDashboard.rejected, (state) => {
      state.summary = initialState.summary;
      state.status = Status.ERROR;
    });
  },
});
export const { setItems } = productSlice.actions;
export default productSlice.reducer;
