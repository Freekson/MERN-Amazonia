import { TUser } from "../../types";

export interface UserState {
  user: TUser | null;
  userAddress: TUserAddress | null;
  userPaymentMethod: string;
}

export type TUserAddress = {
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

export type setUserProps = {
  name: string;
  email: string;
  password: string;
};

export type setMapLocationProps = {
  lat: number;
  lng: number;
  address: string;
  name: string;
  vicinity: string;
  googleAddressId: string;
};
