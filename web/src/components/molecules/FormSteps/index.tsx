import { useAppContext } from "@/context";
import { defineSteps } from "./constants";
import { CustomSteps } from "./styles";

interface FormStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function FormSteps({
  currentStep,
  onStepClick,
}: Readonly<FormStepsProps>) {
  const { theme } = useAppContext();

  return (
    <CustomSteps
      $theme={theme}
      responsive={false}
      current={currentStep}
      direction="horizontal"
      items={defineSteps({
        currentStep,
        handleStepClick: onStepClick,
      })}
    />
  );
}
