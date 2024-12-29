import { Col, Row } from "antd";
import styled from "styled-components";

export const AppContainer = styled(Row)`
  height: 100vh;
`;

export const BodyContainer = styled(Col)`
  height: calc(100vh - 60px);

  main {
    padding: 0.5rem;
    overflow-y: auto;
    height: calc(100vh - 140px);
  }
`;
