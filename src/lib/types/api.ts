export interface Response<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination?: Pagination;
}

export type Pagination = {
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
