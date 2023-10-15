import { IProduct } from "../../types";

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface ProductState {
  products: IProduct[];
  status: Status;
  countProducts?: number;
  pages?: number;
  page?: number;
}

export type ProductParams = {
  slug: string;
};

export type DataParams = {
  page: string;
  query: string;
  category: string;
  price: string;
  rating: string;
  order: string;
};

export interface ProductResponse {
  products: IProduct[];
  countProducts: number;
  page: number;
  pages: number;
}
