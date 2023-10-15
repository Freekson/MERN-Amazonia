export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export type DashboardParams = {
  token: string;
};

export interface DashboardState {
  summary: IDashboard;
  status: Status;
}

export interface IDashboard {
  orders: OrderType[];
  users: UserType[];
}

type OrderType = {
  _id: null;
  numOrders: number;
  totalSales: number;
};

type UserType = {
  _id: null;
  numUsers: number;
};
