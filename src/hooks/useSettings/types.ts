export type Setting = {
  _id?: string;
  companyName?: string | null;
  description?: string | null;
  businessName?: string | null;
  ruc?: string | null;
  url?: string | null;
  logo?: string | null;
  tax?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetSetting = Setting;
