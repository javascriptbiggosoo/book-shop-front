import React from "react";
import logo from "../../assets/images/logo.webp";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyle>
      <h1 className="logo">
        <img src={logo} alt="logo" />
      </h1>
      <div className="copyright">
        <p>copyright(c), 2024, book store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .logo {
    img {
      height: 50px;
    }
    .copyright {
      p {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.color.text};
      }
    }
  }
`;
