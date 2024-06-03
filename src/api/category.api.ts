import { Category } from "../model/category.model";
import { httpClient } from "./http";

export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>("/categories");
  return response.data;
};
