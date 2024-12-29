import { Typography } from "antd";
import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: Readonly<TitleProps>) {
  return <Typography.Title level={2}>{children}</Typography.Title>;
}
