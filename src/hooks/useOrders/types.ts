import { GeneralResponse } from "../types";
import { Center } from "../useCenters";
import { Client } from "../useClients";
import { Course } from "../useCourses";
import { DocumentType } from "../useDocuments";
import { User } from "../useUsers";

export type Order = {
  _id?: string;
  orderNumber?: string;
  client?: Client;
  documentType?: DocumentType;
  documentNumber?: string | null;
  seller?: User;
  center?: Center;
  percentIva?: number;
  subtotal?: number;
  amountInIva?: number;
  total?: number;
  status?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  orderLines?: OrderDetail[];
};

export type OrderDetail = {
  _id?: string | null;
  order?: Order | null;
  course?: Course | null;
  name?: string | null;
  quantity?: number;
  discount?: number;
  price?: number;
  amount?: number;
};

export type OrderResponse =GeneralResponse & {
  doc?: Order | null;
}
