import { Subtitle, Text } from "@/components/atoms";
import {
  ElectricityForm,
  FormStepControlButtons,
  FormSteps,
  HeatForm,
  HousingSummary,
  WasteForm,
} from "@/components/molecules";
import { useFootprintForm } from "@/context";
import { Col, CollapseProps, Row } from "antd";
import { useState } from "react";
import { defineSubSteps, defineSubStepsSmallScreen } from "./constants";
import { CustomCollapse } from "./styles";
import { SubStepToComponentMap } from "./types";

interface HousingFormProps {
  gotToNextStep: () => void;
}

const TOTAL_SUB_STEPS = 2;

export function HousingForm({ gotToNextStep }: Readonly<HousingFormProps>) {
  const form = useFootprintForm();
  const [currentStep, setCurrentStep] = useState<number>(0);

  function handleSubStepClick(step: number): void {
    if (step === currentStep || step > TOTAL_SUB_STEPS) {
      return;
    }
    setCurrentStep(step);
  }

  function handlePreviousClick(): void {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
  }

  function handleNextClick(): void {
    if (currentStep == 2) {
      return gotToNextStep();
    }
    setCurrentStep(currentStep + 1);
  }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <Text weight="bold">Heat</Text>,
      children: (
        <HeatForm initialValue={form.getFieldValue(["housing", "heat"])} />
      ),
    },
    {
      key: "2",
      label: <Text weight="bold">Electricity</Text>,
      children: <ElectricityForm />,
    },
  ];

  const subStepToComponentMap: SubStepToComponentMap = {
    0: (
      <CustomCollapse items={items} bordered={false} expandIconPosition="end" />
    ),
    1: <WasteForm />,
    2: <HousingSummary />,
  };

  return (
    <Row justify="center" gutter={[0, 64]}>
      <Col xs={24}>
        <Row justify="center">
          <Col>
            <Subtitle>Housing</Subtitle>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={0}>
        <FormSteps
          size="small"
          current={currentStep}
          labelPlacement="vertical"
          items={defineSubStepsSmallScreen({
            handleSubStepClick,
          })}
        />
      </Col>
      <Col xs={0} sm={24}>
        <FormSteps
          progressDot
          size="small"
          current={currentStep}
          items={defineSubSteps({
            handleSubStepClick,
          })}
        />
      </Col>
      <Col xs={20}>{subStepToComponentMap[currentStep]}</Col>
      <FormStepControlButtons
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        disabledPreviousButton={currentStep == 0}
      />
    </Row>
  );
}
