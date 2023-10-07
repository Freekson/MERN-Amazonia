export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
  quantity: number;
}
export interface IProducts {
  products: IProduct[];
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
  token?: string;
};

export interface IOrder {
  _id: string;
  orderItems: IProduct[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt?: string;
}
