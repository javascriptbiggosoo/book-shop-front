import React from "react";
import { CartStyle } from "./Cart";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";
import { useAlert } from "../hooks/useAlert";
import FindAddressButton from "../components/order/FindAddressButton";
import { order } from "../api/order.api";

interface DeliveryForm extends Omit<Delivery, "deliveryId"> {
  detailAddress: string;
}

export default function Order() {
  const location = useLocation();
  const { showAlert, showConfirm } = useAlert();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();
  const opderDataFromCart = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } = opderDataFromCart;
  const navigate = useNavigate();

  const handlePay = async (data: DeliveryForm) => {
    // 주문 정보를 포함한 주문서 객체를 생성
    const orderData: OrderSheet = {
      ...opderDataFromCart, // 장바구니에서 전달된 기존 주문 데이터 포함
      delivery: {
        ...data, // 배송 폼에서 전달된 데이터 포함
        address: `${data.address} ${data.detailAddress}`, // 주소와 상세 주소를 결합하여 저장
      },
    };

    showConfirm("주문을 진행하시겠습니까?", () => {
      order(orderData).then(() => {
        showAlert("주문이 처리되었습니다.");
        navigate("/orderlist");
      });
    });
  };
  return (
    <>
      <Title size={"large"}>주문서 작성</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <div className="toggle">
              <Title size="medium" color="text">
                배송 정보
              </Title>
            </div>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    // console.log(address); // 대구 서구 국채보상로 5-26
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("detailAddress", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.detailAddress && (
                <p className="error-text">상세 주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("receiver", { required: true })}
                  />
                </div>
              </fieldset>
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
      ;
    </>
  );
}
