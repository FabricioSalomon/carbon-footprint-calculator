import { Col, Row } from "antd";
import React, { MouseEvent } from "react";
import { Container, NextButton, PreviousButton } from "./styles";

interface FormStepControlButtonsProps {
  onNextClick: () => void;
  onPreviousClick: () => void;
  disabledNextButton?: boolean;
  disabledPreviousButton?: boolean;
}

export function FormStepControlButtons({
  onNextClick,
  onPreviousClick,
  disabledNextButton,
  disabledPreviousButton,
}: Readonly<FormStepControlButtonsProps>) {
  function handlePreviousClick(
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ): void {
    event.stopPropagation();
    event.preventDefault();
    onPreviousClick();
  }

  function handleNextClick(
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ): void {
    event.stopPropagation();
    event.preventDefault();
    onNextClick();
  }

  return (
    <Container xs={24}>
      <Row justify="space-around">
        <Col>
          <PreviousButton
            hierarchy="tertiary"
            disabled={disabledPreviousButton}
            onClick={handlePreviousClick}
          >
            Previous
          </PreviousButton>
        </Col>
        <Col>
          <NextButton
            hierarchy="primary"
            disabled={disabledNextButton}
            onClick={handleNextClick}
          >
            Next
          </NextButton>
        </Col>
      </Row>
    </Container>
  );
}
