import React from "react";
import { CartStyle } from "./Cart";
import { useLocation } from "react-router-dom";

export default function Order() {
  const location = useLocation();
  const orderDatafromCart = location.state;

  return <CartStyle>Order</CartStyle>;
}
