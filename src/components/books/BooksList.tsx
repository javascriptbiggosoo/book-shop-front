import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";
import Books from "../../pages/Books";

interface Props {
  books: Book[];
}

export default function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>("grid");
  const loaction = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(loaction.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [loaction.search]);

  return (
    <BooksListStyles view={view}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view={view} />
      ))}
    </BooksListStyles>
  );
}

interface BooksListStylesProps {
  view: ViewMode;
}

const BooksListStyles = styled.div<BooksListStylesProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid"
      ? "repeat(auto-fill, minmax(200px, 1fr))"
      : "repeat(1, 1fr)"};
  gap: 24px;
`;
