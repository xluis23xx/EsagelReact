import { GeneralResponse } from "../types";
import { User } from "../useUsers";

export type Goal = {
  _id?: string;
  seller?: User | null;
  startDate?: string;
  endDate?: string;
  estimatedQuantity?: number;
  quantitySold?: number;
  status?: number | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

export type GoalResponse = GeneralResponse & {
  doc?: Goal | null;
}
