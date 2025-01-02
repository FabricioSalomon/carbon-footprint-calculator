"use client";

import { FormItem, Title } from "@/components/atoms";
import {
  FoodForm,
  FootprintSummary,
  FormStepControlButtons,
  FormSteps,
  HousingForm,
  TravelForm,
} from "@/components/molecules";
import { FootprintFormFields } from "@/types";
import { Col, Form, Row } from "antd";
import { useState } from "react";
import { defineSteps } from "./constants";
import { StepToComponentMap } from "./types";

const { useForm } = Form;

const TOTAL_STEPS = 3;

export function FootprintForm() {
  const [form] = useForm<FootprintFormFields>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  function handleStepClick(step: number): void {
    if (step === currentStep || step > TOTAL_STEPS) {
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
    if (currentStep === 3) {
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  const initialValues: FootprintFormFields = {
    housing: {
      heat: [
        {
          index: 0,
          consumption: undefined,
          fuelSource: undefined,
          totalOutput: undefined,
        },
      ],
      electricity: {
        consumption: undefined,
        eGridSubRegion: undefined,
        totalOutput: undefined,
      },
      waste: {
        consumption: undefined,
        totalOutput: undefined,
      },
    },
    food: {
      food: undefined,
      consumption: undefined,
      serving: undefined,
      totalOutput: undefined,
    },
    travel: [
      {
        index: 0,
        fuel: undefined,
        distance: undefined,
        consumption: undefined,
        totalOutput: undefined,
      },
    ],
  };

  const stepToComponentMap: StepToComponentMap = {
    0: <HousingForm gotToNextStep={handleNextClick} />,
    1: <FoodForm />,
    2: <TravelForm initialValue={form.getFieldValue(["travel"])} />,
    3: <FootprintSummary />,
  };

  return (
    <Row justify="center" gutter={[0, 16]}>
      <Col xs={24}>
        <Row justify="center">
          <Col>
            <Title>Calculator</Title>
          </Col>
        </Row>
      </Col>
      <Col xs={20} md={16} lg={12}>
        <Form
          form={form}
          name="footprint"
          initialValues={initialValues}
          style={{
            width: "100%",
          }}
        >
          <Row justify="center">
            <Col xs={24}>
              <Row justify="center" gutter={[0, 30]}>
                <Col xs={24}>
                  <FormItem name={["currentStep"]} noStyle>
                    <FormSteps
                      current={currentStep}
                      items={defineSteps({
                        currentStep,
                        handleStepClick,
                      })}
                    />
                  </FormItem>
                </Col>
                <Col xs={24}>
                  <FormItem name={["currentStep"]} noStyle>
                    {stepToComponentMap[currentStep]}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            {currentStep == 0 ? null : (
              <FormStepControlButtons
                onNextClick={handleNextClick}
                onPreviousClick={handlePreviousClick}
                disabledPreviousButton={currentStep == 0}
                disabledNextButton={currentStep === TOTAL_STEPS}
              />
            )}
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
