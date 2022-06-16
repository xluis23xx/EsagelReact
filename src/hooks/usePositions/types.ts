import { GeneralResponse } from "../types";

export type Position = {
  _id?: string;
  name?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PositionResponse = GeneralResponse & {
  doc?: Position | null;
}
