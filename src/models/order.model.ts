export interface Order {
  id: number;
  total_quantity: number;
  total_price: number;
  book_title: string;
  address: string;
  receiver: string;
  contact: string;
  created_at: string;
}
export interface OrderSheet {
  items: number[];
  total_quantity: number;
  total_price: number;
  fisrt_book_title: string;
  delivery: Delivery;
}
export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetail {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetailItem {
  book_id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
