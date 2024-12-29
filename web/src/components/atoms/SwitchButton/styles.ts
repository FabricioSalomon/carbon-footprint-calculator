import { Switch } from "antd";
import styled from "styled-components";


export const CustomSwitch = styled(Switch)`
  background: ${({ theme }) => theme.colors.primaryBackground} !important;
  span {
    color: ${({ theme }) => theme.typography.colors.black} !important;
  }
`;
