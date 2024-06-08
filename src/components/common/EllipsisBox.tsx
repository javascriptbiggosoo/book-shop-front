import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  linelimit?: number;
}

export default function EllipsisBox({ children, linelimit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "접기" : "더보기"} <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

interface EllipsisBoxStyleProps {
  linelimit?: number;
  $expanded: boolean;
}
const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? "none" : linelimit || 4};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }
  .toggle {
    display: flex;
    justify-content: flex-end;
    svg {
      transform: ${({ $expanded }) => ($expanded ? "rotate(180deg)" : "none")};
    }
  }
`;
