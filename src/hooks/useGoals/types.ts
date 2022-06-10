import { Employee } from "../useEmployees";

export type Goal = {
  _id?: string;
  employee?: Employee | null;
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
