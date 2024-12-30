import { ReactNode } from "react";

export type SubStepToComponentMap = {
  [key: number]: ReactNode;
};

export type DefineSubSteps = {
  handleSubStepClick: (step: number) => void;
};
