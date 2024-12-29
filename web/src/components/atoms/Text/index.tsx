import { Typography } from "antd";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

export function Text({ children }: Readonly<TextProps>) {
  return <Typography.Text>{children}</Typography.Text>;
}
