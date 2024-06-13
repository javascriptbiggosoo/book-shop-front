import { BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
  try {
    return await requestHandler<BookReviewItem[]>("get", `/reviews/${bookId}`);
  } catch (error) {
    console.error("Fetch review failed:", error);
    throw error;
  }
};

interface AddBookReviewResponse {
  message: string;
}

export const addBookReview = async (
  bookId: string,
  review: BookReviewItemWrite
) => {
  try {
    return await requestHandler<AddBookReviewResponse>(
      "post",
      `/reviews/${bookId}`
    );
  } catch (error) {
    console.error("Add review failed:", error);
    throw error;
  }
};
