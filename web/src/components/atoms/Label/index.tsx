import { Typography } from "antd";
import { ReactNode } from "react";
import { useTheme } from "styled-components";
import { LabelIcon } from "./styles";

interface LabelProps {
  icon?: ReactNode;
  children: ReactNode;
  iconSize?: "small" | "middle" | "large";
}

export function Label({ children, icon, iconSize }: Readonly<LabelProps>) {
  const { typography } = useTheme();
  return (
    <Typography.Text
      style={{
        position: "relative",
        fontSize: typography.size.small,
      }}
    >
      {children}
      {icon ? (
        <LabelIcon
          icon={icon}
          hierarchy="tertiary"
          size={iconSize ?? "middle"}
        />
      ) : null}
    </Typography.Text>
  );
}
