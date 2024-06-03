import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="normal">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("size props 적용", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="normal">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  });
});
