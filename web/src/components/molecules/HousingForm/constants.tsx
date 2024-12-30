import { StepProps } from "antd";
import { DefineSubSteps } from "./types";

export function defineSubSteps({
  handleSubStepClick,
}: DefineSubSteps): StepProps[] {
  return [
    {
      title: "Energy",
      onClick: () => handleSubStepClick(0),
    },
    {
      title: "Waste",
      onClick: () => handleSubStepClick(1),
    },
    {
      title: "Summary",
      onClick: () => handleSubStepClick(2),
    },
  ];
}

export function defineSubStepsSmallScreen({
  handleSubStepClick,
}: DefineSubSteps): StepProps[] {
  return [
    {
      onClick: () => handleSubStepClick(0),
    },
    {
      onClick: () => handleSubStepClick(1),
    },
    {
      onClick: () => handleSubStepClick(2),
    },
  ];
}
