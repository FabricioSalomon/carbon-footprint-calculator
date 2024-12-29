import styled from "styled-components";
import { CustomButton } from "../CustomButton";

export const LabelIcon = styled(CustomButton)`
  top: -10px;
  padding: 0;
  right: -15px;
  position: absolute;

  width: fit-content !important;
  height: fit-content !important;

  .ant-btn-icon {
    svg {
      width: ${({ size }) => {
        if (size === "small") {
          return "10px";
        }
        if (size === "large") {
          return "20px";
        }
        return "15px";
      }};
    }
  }
`;
