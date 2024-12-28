"use client";

import { Col, Form, Row, Typography } from "antd";
import { useTheme } from "styled-components";
import { FootprintFormInitialValues } from "./types";

const { useForm } = Form;

export function FootprintForm() {
  const [form] = useForm();
  const { typography } = useTheme();

  const initialValues: FootprintFormInitialValues = {
    housing: {
      heat: undefined,
      electricity: undefined,
    },
  };

  return (
    <Row>
      <Col xs={24}>
        <Typography
          style={{
            fontSize: typography.size.title,
            color: typography.colors.primary,
          }}
        >
          Calculator
        </Typography>
      </Col>
      <Col xs={24}></Col>
      <Col xs={24}>
        <Form name="footprint" form={form} initialValues={initialValues}></Form>
      </Col>
    </Row>
  );
}
