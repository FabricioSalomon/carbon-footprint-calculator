import { DefaultColors, FontColors } from "./type";

export const fontSize = {
  title: "32px",
  subtitle: "24px",
  normal: "16px",
  small: "12px",
};

export const fontWeight = {
  normal: 400,
  semiBold: 600,
  bold: 700,
};

export const defaultColors: DefaultColors = {
  black: "#000000",
  white: "#fffffff",
  red: "#ff0000",
};

export const textLightColors: FontColors = {
  ...defaultColors,
  primary: "#222222",
  secondary: "#333333",
  tertiary: "#555555",
};

export const textDarkColors: FontColors = {
  ...defaultColors,
  primary: "#e1e1e1",
  secondary: "#cccccc",
  tertiary: "#888888",
};
