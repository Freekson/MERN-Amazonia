import { IProduct } from "../../types";

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface ProductState {
  products: IProduct[];
  status: Status;
}
