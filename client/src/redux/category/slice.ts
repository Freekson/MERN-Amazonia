import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, Status, CategoryState } from "./types";
import axios from "axios";

const initialState: CategoryState = {
  categories: [],
  status: Status.LOADING,
};

export const fetchCategories = createAsyncThunk<ICategory[]>(
  "category/fetchCategories",
  async () => {
    const { data } = await axios.get<ICategory[]>(`/api/products/categories`);
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categories = [];
      state.status = Status.ERROR;
    });
  },
});
export const { setItems } = categorySlice.actions;
export default categorySlice.reducer;
