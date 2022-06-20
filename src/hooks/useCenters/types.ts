import { GeneralResponse } from "../types";

export type Center = {
  _id?: string;
  branchName?: string;
  address?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CenterResponse = GeneralResponse & {
  doc?: Center | null;
}
