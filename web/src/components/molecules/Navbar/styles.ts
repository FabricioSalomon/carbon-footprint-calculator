import { Form, Row } from "antd";
import { styled } from "styled-components";

export const Nav = styled.nav`
  height: 80px;
  display: flex;
  padding: 10px;
  align-items: center;
  background-color: #000000;
  justify-content: space-between;
  color: ${({ theme }) => theme.typography.colors.primary};
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
