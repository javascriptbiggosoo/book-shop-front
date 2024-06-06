import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";

export interface SignupProps {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { storeLogin, isloggedIn, storeLogout } = useAuthStore();

  const onSubmit = (data: SignupProps) => {
    login(data).then(
      (response) => {
        console.log(response.token);
        storeLogin(response.token);

        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        console.log(error);
        showAlert("로그인에 실패했습니다.");
      }
    );
  };

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
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
          <fieldset>
            <Button size="medium" scheme="primary" type="submit">
              로그인
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
