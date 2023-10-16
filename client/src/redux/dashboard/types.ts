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
  productCategories: ProductCategoryType[];
  dailyOrders: DailyOrdersType[];
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

type ProductCategoryType = {
  _id: string;
  count: number;
};

type DailyOrdersType = {
  _id: string;
  orders: number;
  sales: number;
};
