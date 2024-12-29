import { ThemeEnum } from "@/types";
import { Steps } from "antd";
import styled from "styled-components";

export type CustomStepsProps = {
  $theme: ThemeEnum;
};

export const CustomSteps = styled(Steps)<CustomStepsProps>`
  .ant-steps-item {
    .ant-steps-item-container {
      .ant-steps-item-content {
        .ant-steps-item-title {
          &:after {
            background-color: ${({ $theme, theme }) =>
              $theme === ThemeEnum.DARK
                ? theme.typography.colors.white
                : "#d6d6d6"};
          }
        }
      }
    }
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
