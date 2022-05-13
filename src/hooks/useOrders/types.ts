import { Client } from "../useClients";
import { Course } from "../useCourses";
import { DocumentType } from "../useDocuments";
import { User } from "../useUsers";

export type Order = {
  _id?: string;
  orderNumber?: string;
  client?: Client;
  documentType?: DocumentType;
  user?: User;
  percentIva?: number;
  subtotal?: number;
  amountWithIva?: number;
  total?: number;
  status?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  courses?: Course[];
};

export type OrderDetail = {
  _id?: string;
  order?: Order;
  course?: Course;
  quantity?: number;
  discount?: number;
  price?: number;
  amount?: number;
};

export type GetOrder = Order;
export type GetOrders = Order[];
export type GetOrderDetails = OrderDetail[];
