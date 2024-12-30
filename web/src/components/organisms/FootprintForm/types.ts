import { ReactNode } from "react";

export type StepToComponentMap = {
  [key: number]: ReactNode;
};

export type DefineSteps = {
  currentStep: number;
  handleStepClick: (step: number) => void;
};
