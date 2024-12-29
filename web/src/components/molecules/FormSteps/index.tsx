import { useAppContext } from "@/context";
import { Form } from "antd";
import { defineSteps } from "./constants";
import { CustomSteps } from "./styles";

const { useFormInstance, useWatch } = Form;

export function FormSteps() {
  const form = useFormInstance();
  const { theme } = useAppContext();

  const currentStep = useWatch(["currentStep"], form);

  function handleStepClick(step: number): void {
    form.setFieldValue(["currentStep"], step);
  }

  return (
    <CustomSteps
      $theme={theme}
      current={currentStep}
      items={defineSteps({ currentStep, handleStepClick })}
    />
  );
}
