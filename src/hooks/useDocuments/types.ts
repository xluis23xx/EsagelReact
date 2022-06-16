import { GeneralResponse } from "../types";

export type DocumentType = {
  _id?: string;
  name?: string;
  code?: string;
  length?: number;
  status?: number;
  operation?: string; // "comprobante" o "persona"
  createdAt?: string;
  updatedAt?: string;
};

export type DocumentTypeResponse = GeneralResponse & {
  doc?: DocumentType | null;
}
