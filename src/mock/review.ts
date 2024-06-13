import { http, HttpResponse } from "msw";
import { BookReviewItem } from "../models/book.model";
import { fakerKO } from "@faker-js/faker";

const mockReviewData: BookReviewItem[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    id: index + 1,
    userName: fakerKO.person.firstName(),
    content: fakerKO.lorem.paragraph(),
    createdAt: fakerKO.date.past().toISOString(),
    score: fakerKO.helpers.rangeToNumber({ min: 1, max: 5 }),
  })
);

export const reviewsById = http.get(
  "http://localhost:1358/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);

export const addReview = http.post(
  "http://localhost:1358/reviews/:bookId",
  () => {
    return HttpResponse.json(
      { message: "Review added" },
      {
        status: 201,
      }
    );
  }
);
