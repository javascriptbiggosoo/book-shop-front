import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
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

export const fetchbook = async (bookId: string) => {
  const response = await httpClient.get(`/books/${bookId}`);
  console.log(response.data);

  return response.data[0];
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);
  return response.data;
};
export const unLikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);
  return response.data;
};
