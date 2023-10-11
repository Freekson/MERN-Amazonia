import { IOrder } from "../../types";

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export type OrderParams = {
  orderId: string;
  token?: string;
};

export type OrdersParams = {
  token?: string;
};

export interface OrderState {
  orders: IOrder[];
  status: Status;
}
