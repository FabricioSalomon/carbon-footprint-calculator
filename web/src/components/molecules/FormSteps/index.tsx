import { useAppContext } from "@/context";
import { CustomSteps } from "./styles";
import { StepsProps } from "antd";

interface FormStepsProps extends StepsProps {}

export function FormSteps({ ...props }: Readonly<FormStepsProps>) {
  const { theme } = useAppContext();

  return (
    <CustomSteps
      {...props}
      $theme={theme}
      responsive={false}
      direction="horizontal"
    />
  );
}
