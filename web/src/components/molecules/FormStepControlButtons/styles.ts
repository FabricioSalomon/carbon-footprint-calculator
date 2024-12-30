import { CustomButton } from "@/components/atoms";
import { Col } from "antd";
import styled from "styled-components";

export const PreviousButton = styled(CustomButton)`
  border: ${({ theme }) => "1px solid" + theme.colors.primary};
  color: ${({ theme }) => theme.typography.colors.primary};

  &:disabled {
    color: ${({ theme }) => theme.typography.colors.tertiary};
    border: ${({ theme }) => "1px solid" + theme.typography.colors.tertiary};
  }
`;

export const NextButton = styled(CustomButton)`
  border: ${({ theme }) => "1px solid" + theme.colors.primary};

  &:disabled {
    color: ${({ theme }) => theme.typography.colors.tertiary};
  }
`;

export const Container = styled(Col)`
  width: 100%;
`;
