import { Provider } from "../useProviders";
import { User } from "../useUsers";

export type Purchase = {
  _id?: string;
  purchaseNumber?: string;
  name?: string;
  reason?: string;
  buyer?: User | null;
  provider?: Provider | null;
  price?: number;
  quantity?: number;
  total?: number;
  status?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type GetPurchase = Purchase;
export type GetPurchases = Purchase[];
