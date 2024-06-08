import { httpClient } from "./http";

interface AddCartBody {
  bookId: number;
  quantity: number;
}

export const addCart = async (body: AddCartBody) => {
  const reponse = await httpClient.post("/cart-items", body);
  return reponse.data;
};
