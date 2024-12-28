export type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
  hoverPrimary: string;
  focusPrimary: string;
  hoverSecondary: string;
  focusSecondary: string;
  hoverTertiary: string;
  focusTertiary: string;
  primaryBackground: string;
  secondaryBackground: string;
  tertiaryBackground: string;
  link: string;
  linkHover: string;
  error: string;
  success: string;
};

export type FontSize = {
  title: string;
  subtitle: string;
  normal: string;
  small: string;
};

export type FontWeight = {
  normal: number;
  semiBold: number;
  bold: number;
};

export type DefaultColors = {
  red: string;
  black: string;
  white: string;
};

export type FontColors = DefaultColors & {
  primary: string;
  secondary: string;
  tertiary: string;
};

export type Typography = {
  size: FontSize;
  weight: FontWeight;
  colors: FontColors;
};

export type CustomTheme = {
  colors: Colors;
  typography: Typography;
};
