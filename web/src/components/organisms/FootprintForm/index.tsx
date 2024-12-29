"use client";

import { Title } from "@/components/atoms";
import { Col, Form, Row } from "antd";
import { FootprintFormInitialValues } from "./types";
import { FormSteps } from "@/components/molecules";

const { useForm } = Form;

export function FootprintForm() {
  const [form] = useForm();

  const initialValues: FootprintFormInitialValues = {
    housing: {
      heat: undefined,
      electricity: undefined,
    },
  };

  return (
    <Row>
      <Form name="footprint" form={form} initialValues={initialValues}>
        <Col xs={24}>
          <Title>Calculator</Title>
        </Col>
        <Col xs={24}>
          <Form.Item name={["currentStep"]} noStyle>
            <FormSteps />
          </Form.Item>
        </Col>
        <Col xs={24}></Col>
      </Form>
    </Row>
  );
}
