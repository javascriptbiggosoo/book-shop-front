import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchbook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/cart.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();
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
      console.log(book);

      setBook(book);
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

  return { book, likeToggle, addToCart, cartAdded };
};
