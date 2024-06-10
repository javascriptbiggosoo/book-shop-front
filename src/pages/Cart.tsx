import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useAlert } from "../hooks/useAlert";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { OrderSheet } from "../models/order.model";

export default function Cart() {
  const { carts, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity * cart.price;
      }

      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해주세요");
      return;
    }

    const orderData: Omit<OrderSheet, "deliveryId"> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: carts.find((cart) => cart.id === checkedItems[0])!.title,
    };

    showConfirm("주문하시겠습니까", () => {
      navigate("/order", { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {isEmpty ? (
          <Empty title="장바구니가 비어있습니다." icon={<FaShoppingCart />} />
        ) : (
          <>
            <div className="content">
              {carts.map((cart) => (
                <CartItem
                  onDelete={handleItemDelete}
                  checkedItems={checkedItems}
                  key={cart.id}
                  cart={cart}
                  onCheck={handleCheckItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    .toggle {
      display: flex;
      align-items: center;
      padding: 0 0 24px 0;

      button {
        border: none;
        background: none;
        cursor: pointer;

        svg {
          font-size: 24px;
        }
      }
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        display: flex;
        align-items: center;
        input {
          width: 100%;
        }
      }
    }
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;
