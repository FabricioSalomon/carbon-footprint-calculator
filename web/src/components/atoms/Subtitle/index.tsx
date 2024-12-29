import { Typography } from "antd";
import { ReactNode } from "react";

interface SubtitleProps {
  children: ReactNode;
}

export function Subtitle({ children }: Readonly<SubtitleProps>) {
  return <Typography.Title level={3}>{children}</Typography.Title>;
}
