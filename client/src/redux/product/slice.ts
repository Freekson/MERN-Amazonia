import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataParams, ProductParams, ProductState, Status } from "./types";
import { IProduct } from "../../types";
import axios from "axios";

const initialState: ProductState = {
  products: [],
  status: Status.LOADING,
  countProducts: 0,
  pages: 1,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAllProductsStatus",
  async () => {
    const { data } = await axios.get<IProduct[]>("/api/products");

    return data;
  }
);
export const fetchProduct = createAsyncThunk<IProduct, ProductParams>(
  "product/fetchProductStatus",
  async ({ slug }) => {
    const { data } = await axios.get<IProduct>(`/api/products/slug/${slug}`);
    return data;
  }
);
export const fetchData = createAsyncThunk<IProduct[], DataParams>(
  "products/fetchDataStatus",
  async ({ page, query, category, price, rating, order }) => {
    const { data } = await axios.get(
      `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
    );
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products = [];
      state.status = Status.ERROR;
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.products = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products[0] = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.products = [];
      state.status = Status.ERROR;
    });

    builder.addCase(fetchData.pending, (state) => {
      state.products = [];
      state.status = Status.LOADING;
      state.countProducts = 0;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
      state.countProducts = action.payload.length;
      state.pages = 2;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.products = [];
      state.status = Status.ERROR;
      state.countProducts = 0;
    });
  },
});
export const { setItems } = productSlice.actions;
export default productSlice.reducer;
