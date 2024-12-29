import { ReactNode } from "react";
import { Circle } from "./styles";

interface CircledStepProps {
  children: ReactNode;
  backgroundColor?: string;
}

export function CircledStep({
  children,
  backgroundColor,
}: Readonly<CircledStepProps>) {
  return <Circle $backgroundColor={backgroundColor}>{children}</Circle>;
}
