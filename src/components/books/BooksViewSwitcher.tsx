import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

const viewOptions = [
  {
    value: "grid",
    icon: <FaTh />,
  },
  {
    value: "list",
    icon: <FaList />,
  },
];

export type ViewMode = "grid" | "list";

export default function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => {
        return (
          <Button
            key={option.value}
            size="medium"
            scheme={
              searchParams.get(QUERYSTRING.VIEW) === option.value
                ? "primary"
                : "normal"
            }
            onClick={() => handleSwitch(option.value as ViewMode)}
          >
            {option.icon}
          </Button>
        );
      })}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 0.5rem;

  svg {
    fill: white;
  }
`;