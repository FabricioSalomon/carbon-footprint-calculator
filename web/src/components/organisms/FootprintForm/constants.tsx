import {
  CarIcon,
  CircledStep,
  FoodIcon,
  HousingIcon,
  SummaryIcon,
} from "@/components/atoms";
import { StepProps } from "antd";
import { DefineSteps } from "./types";

export function defineSteps({
  currentStep = 0,
  handleStepClick,
}: DefineSteps): StepProps[] {
  return [
    {
      onClick: () => handleStepClick(0),
      icon: (
        <CircledStep backgroundColor={currentStep >= 0 ? "#e8c57e" : undefined}>
          <HousingIcon />
        </CircledStep>
      ),
    },
    {
      onClick: () => handleStepClick(1),
      icon: (
        <CircledStep backgroundColor={currentStep >= 1 ? "#e8c57e" : undefined}>
          <FoodIcon />
        </CircledStep>
      ),
    },
    {
      onClick: () => handleStepClick(2),
      icon: (
        <CircledStep backgroundColor={currentStep >= 2 ? "#e8c57e" : undefined}>
          <CarIcon />
        </CircledStep>
      ),
    },
    {
      onClick: () => handleStepClick(3),
      icon: (
        <CircledStep backgroundColor={currentStep >= 3 ? "#e8c57e" : undefined}>
          <SummaryIcon />
        </CircledStep>
      ),
    },
  ];
}
