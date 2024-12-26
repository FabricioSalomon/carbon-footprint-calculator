import { Form, Row, Switch } from "antd";
import { styled } from "styled-components";

export type CustomSwitchProps = {
  checked?: boolean;
};

export const Nav = styled.nav`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  color: ${({ theme }) => theme.typography.colors.primary};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

export const CustomForm = styled(Form)`
  width: 100%;
`;

export const CustomRow = styled(Row)`
  width: 100%;
`;

export const CustomFormItem = styled(Form.Item)`
  margin: 0;
  padding: 0;
`;

export const CustomSwitch = styled(Switch)<CustomSwitchProps>`
  background: ${({ theme, checked }) =>
    checked
      ? theme.colors.primaryBackground
      : theme.colors.tertiaryBackground} !important;
  span {
    color: ${({ theme }) => theme.typography.colors.primary} !important;
  }
`;
