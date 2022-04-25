export type DocumentType = {
  _id?: string;
  name?: string;
  status?: number;
  operation?: string; // "comprobante" o "persona"
  createdAt?: string;
  updatedAt?: string;
};

export type GetDocumentType = DocumentType;
export type GetDocumentTypes = DocumentType[];
