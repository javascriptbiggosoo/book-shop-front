import React from "react";
import styled from "styled-components";
import { HeadingSize } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
}

export default function Title({ children, size }: Props) {
  return <TitleStyle>{children}</TitleStyle>;
}

const TitleStyle = styled.div``;
