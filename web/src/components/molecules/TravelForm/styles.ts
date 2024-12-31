import { Col, InputNumber, Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  padding: 1rem 0;
`;

export const CustomInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const CustomCol = styled(Col)`
  .ant-form-item {
    margin: 0;
  }
`;
