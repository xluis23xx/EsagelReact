export type ProspectusOrigin = {
  _id?: string;
  code?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetProspectusOrigin = ProspectusOrigin;
export type GetProspectusOrigins = ProspectusOrigin[];
