import { ThemeEnum } from "@/types";
import { Steps } from "antd";
import styled from "styled-components";

export type CustomStepsProps = {
  $theme: ThemeEnum;
};

export const CustomSteps = styled(Steps)<CustomStepsProps>`
  .ant-steps-item {
    .ant-steps-item-container {
      .ant-steps-icon {
        cursor: pointer;
      }

      .ant-steps-item-tail {
        &:after {
          background-color: ${({ $theme, theme }) =>
            $theme === ThemeEnum.DARK
              ? theme.typography.colors.white
              : "#d6d6d6"};
        }
      }

      .ant-steps-item-content {
        cursor: pointer;
        .ant-steps-item-title {
          color: ${({ theme }) => theme.typography.colors.primary};

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

  .ant-steps-item-wait {
    .ant-steps-item-icon > .ant-steps-icon {
      .ant-steps-icon-dot {
        background: ${({ theme }) => theme.colors.secondary};
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
