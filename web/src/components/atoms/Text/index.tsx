import { TextProps } from "antd/es/typography/Text";
import { ReactNode } from "react";
import { CustomText } from "./styles";

interface CustomTextProps extends TextProps {
  children: ReactNode;
  weight?: "normal" | "bold" | "bolder";
}

export function Text({
  children,
  weight,
  ...props
}: Readonly<CustomTextProps>) {
  return (
    <CustomText {...props} $weight={weight ?? "normal"}>
      {children}
    </CustomText>
  );
}
