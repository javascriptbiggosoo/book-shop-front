import { Book } from "../model/book.model";
import { Pagination } from "../model/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  current_page?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const res = await httpClient.get<FetchBooksResponse>("/books", { params });
    return res.data;
  } catch (error) {
    return {
      books: [],
      pagination: { currentPage: 1, totalCount: 0 },
    };
  }
};
