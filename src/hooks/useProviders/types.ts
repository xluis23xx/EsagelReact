import { DocumentType } from "../useDocuments";

export type Provider = {
  _id?: string;
  businessName?: string;
  contactName?: string;
  phoneNumber?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetProvider = Provider;
export type GetProviders = Provider[];
