import React, { useState } from "react";
import styled from "styled-components";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { BookDetail } from "../../models/book.model";
import { addCart } from "../../api/cart.api";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
  const showAlert = useAlert();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook("" + book.id);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+ev.target.value);
  };

  return (
    <AddToCartStyle>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button
          size={"medium"}
          scheme={"normal"}
          onClick={() => {
            setQuantity((prev) => prev + 1);
          }}
        >
          +
        </Button>
        <Button
          size={"medium"}
          scheme={"normal"}
          onClick={() => {
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
          }}
        >
          -
        </Button>
      </div>

      <Button
        size={"medium"}
        scheme={"primary"}
        onClick={addToCart.bind(null, quantity)}
      >
        장바구니 담기
      </Button>

      {cartAdded && (
        <div className="added">
          <p>장바구니에 추가되었습니다.</p>
          <Link to="/cart">장바구니로 이동</Link>
        </div>
      )}
    </AddToCartStyle>
  );
};

export default AddToCart;

const AddToCartStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 8px 12px;
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;
