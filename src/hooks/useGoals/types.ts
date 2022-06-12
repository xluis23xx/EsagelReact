import { User } from "../useUsers";

export type Goal = {
  _id?: string;
  seller?: User | null;
  startDate?: string;
  endDate?: string;
  estimatedQuantity?: number;
  quantitySold?: number;
  status?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type GetGoal = Goal;
export type GetGoals = Goal[];
