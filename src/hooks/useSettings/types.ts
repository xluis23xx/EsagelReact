import { GeneralResponse } from "../types";

export type Setting = {
  _id?: string;
  companyName?: string | null;
  description?: string | null;
  businessName?: string | null;
  ruc?: string | null;
  url?: string | null;
  logo?: string | null;
  tax?: number | null;
  manual?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type SettingResponse = GeneralResponse & {
  doc?: Setting | null;
};
