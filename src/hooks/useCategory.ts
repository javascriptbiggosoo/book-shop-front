import { useEffect, useState } from "react";
import { Category } from "../model/category.model";
import { fetchCategory } from "../api/category.api";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      const categoryWithAll = [
        { category_id: null, category_name: "전체" },
        ...category,
      ];
      setCategory(categoryWithAll);
    });
  }, []);

  return { category };
};
