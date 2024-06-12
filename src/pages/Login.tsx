import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupStyle } from "./Signup";
import { useAuth } from "@/hooks/useAuth";

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
  const { userLogin } = useAuth();

  const onSubmit = (data: SignupProps) => {
    userLogin(data);
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
              defaultValue={"jasfng@mail.coco"}
            />
            {errors.email && (
              <p>
                <span className="error-text">이메일을 입력해주세요</span>
              </p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              defaultValue={`4444`}
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
