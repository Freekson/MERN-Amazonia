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
};

export type setUserProps = {
  name: string;
  email: string;
  password: string;
};
