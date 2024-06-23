import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "react-query";

export const useBooks = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const { data: booksData, isLoading } = useQuery(
    ["books", location.search],
    () =>
      fetchBooks({
        category_id:
          Number(searchParams.get(QUERYSTRING.CATEGORY_ID)) || undefined,
        news: searchParams.get(QUERYSTRING.NEWS) ? true : false,
        current_page: Number(searchParams.get(QUERYSTRING.PAGE)) || 1,
        limit: LIMIT,
      })
  );

  // const [books, setBooks] = useState<Book[]>([]);
  // const [pagination, setPagination] = useState<Pagination>({
  //   currentPage: 1,
  //   totalCount: 1,
  // });
  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);

  //   fetchBooks({
  //     category_id:
  //       Number(searchParams.get(QUERYSTRING.CATEGORY_ID)) || undefined,
  //     news: searchParams.get(QUERYSTRING.NEWS) ? true : false,
  //     current_page: Number(searchParams.get(QUERYSTRING.PAGE)) || 1,
  //     limit: LIMIT,
  //   }).then(({ books, pagination }) => {
  //     setBooks(books);
  //     setIsEmpty(books.length === 0);
  //     setPagination(pagination);
  //   });
  // }, [location.search]);

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading: isLoading,
  };
};
