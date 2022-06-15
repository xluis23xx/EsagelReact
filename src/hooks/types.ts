
export type GeneralResponse  = {
  status: number;
  message?: string;
}

export type PaginateResponse = GeneralResponse & {
  docs: any[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: null | number;
  prevPage: null | number;
  totalDocs:  number;
  totalPages:  number;
};


export type PaginateParams = {
  limit?: number;
  pageSize?: number;
};

export type BodyParams = {
  startDate?: string
  endDate?: string
  filter?: string
  status?: number | null
}