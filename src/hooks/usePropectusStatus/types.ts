import { GeneralResponse } from "../types";

export type ProspectStatus = {
  _id?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ProspectStatusResponse = GeneralResponse & {
  doc?: ProspectStatus | null;
}
