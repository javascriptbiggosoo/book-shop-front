import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useState } from "react";

export interface SignupProps {
  email: string;
  password: string;
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      login(data).then((response) => {
        showAlert("비밀번호 초기화가 완료되었습니다.");
        navigate("/login");
      });
    } else {
      resetRequest(data).then((response) => {
        setResetRequested(true);
      });
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              inputType="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p>
                <span className="error-text">이메일을 입력해주세요</span>
              </p>
            )}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                inputType="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p>
                  <span className="error-text">비밀번호를 입력해주세요</span>
                </p>
              )}
            </fieldset>
          )}
          <fieldset>
            <Button size="medium" scheme="primary" type="submit">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
        <div className="info">
          <Link to="/reset">비밀번호 초기화</Link>
        </div>
      </SignupStyle>
    </>
  );
}
