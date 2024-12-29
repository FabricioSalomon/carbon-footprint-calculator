import styled from "styled-components";

export type CircleProps = {
  $backgroundColor?: string;
};

export const Circle = styled.div<CircleProps>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "#d6d6d6"};
`;
