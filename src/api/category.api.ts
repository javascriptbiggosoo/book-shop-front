import { httpClient } from "./http";

interface CategoryResponse {
  category_id: number;
  category_name: string;
}

export const fetchCategory = async () => {
  const response = await httpClient.get<CategoryResponse[]>("/categories");

  const data = response.data.map((category) => {
    return {
      id: category.category_id,
      name: category.category_name,
    };
  });
  return data;
};
