import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  height: 100%;
  padding: 0.5rem 4rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;
