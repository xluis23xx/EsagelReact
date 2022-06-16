import { GeneralResponse } from "../types";
import { Client } from "../useClients";
import { Course } from "../useCourses";
import { Order } from "../useOrders";
import { User } from "../useUsers";

export type Sale = {
  _id?: string;
  saleNumber?: string;
  order?: Order;
  seller?: User | null;
  client?: Client | null;
  percentIva?: number;
  subtotal?: number;
  amountInIva?: number;
  total?: number;
  status?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  items?: SaleDetail[];
};

export type SaleDetail = {
  _id?: string | null;
  sale?: Sale | null;
  course?: Course | null;
  name?: string | null;
  quantity?: number;
  discount?: number;
  price?: number;
  amount?: number;
};

export type SaleResponse = GeneralResponse & {
  doc?: Sale | null
}