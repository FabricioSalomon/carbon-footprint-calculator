import { ButtonProps } from "antd";

export type TypedButtonProps = Omit<ButtonProps, "type">;

export enum CustomButtonHierarchyEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export type CustomButtonHierarchy = "primary" | "secondary" | "tertiary";
