import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "react-query";

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);

    const category_id =
      Number(params.get(QUERYSTRING.CATEGORY_ID)) || undefined;
    const news = params.get(QUERYSTRING.NEWS) ? true : false;
    const current_page = pageParam || 1;
    const limit = LIMIT;

    return fetchBooks({
      category_id,
      news,
      current_page,
      limit,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["books", location.search],
    ({ pageParam = 1 }) => getBooks({ pageParam }),
    {
      // fetchNextPage 호출시 여기서 리턴된 값이 pageParam으로 전달됨
      getNextPageParam: (booksRes) => {
        const isLastPage =
          Math.ceil(booksRes.pagination.totalCount / LIMIT) ===
          booksRes.pagination.currentPage;

        // 더 불러올 데이터가 없을 때 false를 반환
        return isLastPage ? null : booksRes.pagination.currentPage + 1;
      },
    }
  );

  const books = data?.pages.flatMap((page) => page.books) || [];
  const pagination = data?.pages[data.pages.length - 1].pagination || {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
