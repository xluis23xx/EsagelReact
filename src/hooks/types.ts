export type PaginateResponse = {
  docs: any[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null | number;
  page: null | number;
  pagingCounter: null | number;
  prevPage: null | number;
  totalDocs: null | number;
  totalPages: null | number;
};

export type PaginateParams = {
  limit?: number;
  pageSize?: number;
};
