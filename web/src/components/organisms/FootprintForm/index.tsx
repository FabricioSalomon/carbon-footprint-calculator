"use client";

import { Subtitle, Title } from "@/components/atoms";
import { FormSteps } from "@/components/molecules";
import { Col, Form, Row, Steps } from "antd";
import { useState } from "react";
import { FootprintFormInitialValues, StepToComponentMap } from "./types";

const { useForm } = Form;

export function FootprintForm() {
  const [form] = useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);

  function handleStepClick(step: number): void {
    if (step === currentStep) {
      return;
    }
    setCurrentStep(step);
  }

  const initialValues: FootprintFormInitialValues = {
    housing: {
      heat: undefined,
      electricity: undefined,
    },
  };

  const stepToComponentMap: StepToComponentMap = {
    0: (
      <Row justify="center" gutter={[0, 16]}>
        <Col xs={24}>
          <Row justify="center">
            <Col>
              <Subtitle>Housing</Subtitle>
            </Col>
          </Row>
        </Col>
        <Col>
          <Steps
            progressDot
            current={0}
            items={[
              {
                title: "Energy",
              },
              {
                title: "Waste",
              },
              {
                title: "Summary",
              },
            ]}
          />
        </Col>
        <Col xs={24}>
          <>Form</>
        </Col>
      </Row>
    ),
    1: <></>,
    2: <></>,
    3: <></>,
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
      <Col xs={20}>
        <Form
          form={form}
          name="footprint"
          initialValues={initialValues}
          style={{
            width: "100%",
          }}
        >
          <Col xs={24}>
            <Row justify="center" gutter={[0, 30]}>
              <Col xs={24}>
                <Form.Item name={["currentStep"]} noStyle>
                  <FormSteps
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name={["currentStep"]} noStyle>
                  {stepToComponentMap[currentStep]}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24}></Col>
        </Form>
      </Col>
    </Row>
  );
}
