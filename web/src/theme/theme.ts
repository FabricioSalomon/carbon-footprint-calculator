import {
  fontSize,
  fontWeight,
  textDarkColors,
  textLightColors,
} from "./constants";
import { CustomTheme } from "./type";

export const lightTheme: CustomTheme = {
  colors: {
    primary: "#e8c57e",
    secondary: "#000000",
    tertiary: "#ffffff",
    hoverPrimary: "#f1d18c",
    focusPrimary: "#caa15a",
    hoverSecondary: "#333333",
    focusSecondary: "#555555",
    hoverTertiary: "#f2f2f2",
    focusTertiary: "#cccccc",
    primaryBackground: "#e8c57e",
    secondaryBackground: "#000000",
    tertiaryBackground: "#f7f7f7",
    link: "#0066cc",
    linkHover: "#004d99",
    error: "#ff4d4d",
    success: "#28a745",
  },
  typography: {
    size: fontSize,
    weight: fontWeight,
    colors: textLightColors,
  },
};

export const darkTheme: CustomTheme = {
  colors: {
    primary: "#e8c57e",
    secondary: "#ffffff",
    tertiary: "#121212",
    hoverPrimary: "#d3a35b",
    focusPrimary: "#b5954a",
    hoverSecondary: "#333333",
    focusSecondary: "#555555",
    hoverTertiary: "#303030",
    focusTertiary: "#4f4f4f",
    primaryBackground: "#e8c57e",
    secondaryBackground: "#ffffff",
    tertiaryBackground: "#121212",
    link: "#4d94ff",
    linkHover: "#3b7bcc",
    error: "#ff4d4d",
    success: "#28a745",
  },
  typography: {
    size: fontSize,
    weight: fontWeight,
    colors: textDarkColors,
  },
};
