import { useEffect, useState } from "react";
import { Category } from "../model/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystring";

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  const setActive = () => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get(QUERYSTRING.CATEGORY_ID)) {
      setCategory((prev) =>
        prev.map((item) => {
          return {
            ...item,
            isActive:
              item.id === Number(searchParams.get(QUERYSTRING.CATEGORY_ID)),
          };
        })
      );
    } else {
      setCategory((prev) =>
        prev.map((item) => {
          return {
            ...item,
            isActive: item.id === null,
          };
        })
      );
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      const categoryWithAll = [{ id: null, name: "전체" }, ...category];
      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category };
};
