export type ProspectusStatus = {
  _id?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetProspectusStatus = ProspectusStatus;
export type GetProspectusStatuses = ProspectusStatus[];
