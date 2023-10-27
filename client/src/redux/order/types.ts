import { IProduct } from "../../types";

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
  orders: UpdatedOrder[];
  status: Status;
}

export type UpdatedOrder = {
  _id: string;
  orderItems: IProduct[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
    location: {
      lat: number;
      lng: number;
      address: string;
      name: string;
      vicinity: string;
      googleAddressId: string;
    };
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user?: {
    _id: string;
    name: string;
  };
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  createdAt: string;
};
