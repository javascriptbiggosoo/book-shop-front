import React from "react";
import styled from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";
import { formatNumber } from "../../utils/format";

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

export default function Title({ children, size, color }: Props) {
  return <TitleStyle size={size}>{children}</TitleStyle>;
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) => theme.color[color || "primary"]};
`;
