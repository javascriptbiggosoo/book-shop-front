import React, { useEffect, useRef } from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/components/common/Loading";
import { useBooksInfinite } from "@/hooks/useBooksInfinite";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  // const moreRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     // entries는 관찰하고 있는 요소들의 배열
  //     entries.forEach((entry) => {
  //       // 뷰포트에 entry.target이 들어온 경우
  //       if (entry.isIntersecting) {
  //         loadMore();
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   });

  //   if (moreRef.current) observer.observe(moreRef.current);

  //   return () => observer.disconnect();
  // }, [books, moreRef]);

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  // console.log(books, pagination);
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {isBooksLoading ? (
          <Loading />
        ) : books && pagination ? (
          <>
            <BooksList books={books} />
            {/* <Pagination pagination={pagination} /> */}
            <div ref={moreRef} className="more">
              더보기
            </div>
          </>
        ) : (
          <BooksEmpty />
        )}
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
  }
`;
