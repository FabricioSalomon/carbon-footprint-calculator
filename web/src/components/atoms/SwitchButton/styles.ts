import { Switch } from "antd";
import styled from "styled-components";

export type CustomSwitchProps = {
  checked?: boolean;
};

export const CustomSwitch = styled(Switch)<CustomSwitchProps>`
  background: ${({ theme }) => theme.colors.primaryBackground} !important;
  span {
    color: ${({ theme }) => theme.typography.colors.black} !important;
  }
`;
