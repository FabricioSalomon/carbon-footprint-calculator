import { Typography } from "antd";
import styled from "styled-components";

export type CustomTextProps = {
  $weight: "normal" | "bold" | "bolder";
};

export const CustomText = styled(Typography.Text)<CustomTextProps>`
  font-weight: ${({ $weight }) => $weight};
`;
