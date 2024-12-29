import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  height: 100%;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;
