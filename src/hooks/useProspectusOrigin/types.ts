import { GeneralResponse } from "../types";

export type ProspectusOrigin = {
  _id?: string;
  code?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ProspectusOriginResponse = GeneralResponse & {
  doc?: ProspectusOrigin | null;
}
