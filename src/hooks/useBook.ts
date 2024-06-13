import { useEffect, useState } from "react";
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from "../models/book.model";
import { fetchbook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>();

  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const likeToggle = () => {
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }
    if (!book) {
      return;
    }

    if (book.liked === 1) {
      unLikeBook(book.id).then((res) => {
        setBook({
          ...book,
          liked: 0,
          likes: book.likes - 1,
        });
      });
    } else {
      likeBook(book.id).then((res) => {
        setBook({
          ...book,
          liked: 1,
          likes: book.likes + 1,
        });
      });
    }
  };

  useEffect(() => {
    if (!bookId) {
      return;
    }
    fetchbook(bookId).then((book) => {
      // console.log(book);
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      console.log(reviews);
      setReviews(reviews);
    });
  }, [bookId]);

  const addToCart = (quantity: number) => {
    if (book === null) {
      return;
    }
    addCart({
      bookId: book.id,
      quantity,
    })
      .then(() => {
        setCartAdded(true);
        showAlert("장바구니에 담겼습니다.");
      })
      .catch((error) => {
        showAlert("장바구니 담기에 실패했습니다.");
      });
  };

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews);
      // });
      showAlert(res.message);
    });
  };

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
