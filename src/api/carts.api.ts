import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface AddCartBody {
  bookId: number;
  quantity: number;
}

export const addCart = async (body: AddCartBody) => {
  const reponse = await httpClient.post("/cart-items", body);
  return reponse.data;
};
export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>("/cart-items");
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`/cart-items/${cartId}`);
  return response.data;
};
