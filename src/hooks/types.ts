export type PaginateResponse = {
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
