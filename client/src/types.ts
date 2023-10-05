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
  name: String;
  email: String;
  password: String;
  isAdmin: Boolean;
  _id: String;
};
