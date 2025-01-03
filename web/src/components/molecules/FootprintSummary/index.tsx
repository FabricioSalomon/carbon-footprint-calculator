import { Subtitle, Text } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { FootprintFormFields } from "@/types";
import { Col, Row } from "antd";

export function FootprintSummary() {
  const form = useFootprintForm();
  const formFields: FootprintFormFields = form.getFieldsValue(true);

  const heatOutput =
    formFields.housing.heat?.reduce(
      (prev, curr) => prev + (curr.totalOutput ?? 0),
      0
    ) ?? 0;
  const electricityOutput = formFields.housing.electricity?.totalOutput ?? 0;
  const wasteOutput = formFields.housing.waste?.totalOutput ?? 0;
  const foodOutput = formFields.food.totalOutput ?? 0;
  const travelOutput =
    formFields.travel
      .filter(({ totalOutput }) => !!totalOutput && totalOutput > 0)
      .reduce((prev, curr) => prev + (curr.totalOutput ?? 0), 0) ?? 0;
  const totalEnergyOutput =
    heatOutput + electricityOutput + wasteOutput + foodOutput + travelOutput;

  return (
    <Row justify="center" gutter={[0, 32]}>
      {totalEnergyOutput === 0 ? (
        <Text
          weight="bold"
          style={{
            textAlign: "center",
          }}
        >
          Well... it looks like you&apos;re rushing a little. What about going
          back and filling out some informations?
        </Text>
      ) : null}
      {totalEnergyOutput > 0 ? (
        <Col xs={24}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Subtitle>Total</Subtitle>
            </Col>
            <Col>
              <Text weight="bolder">{+totalEnergyOutput.toFixed(2)}</Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
        </Col>
      ) : null}
      {heatOutput > 0 || electricityOutput > 0 || wasteOutput > 0 ? (
        <Col xs={20}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Text weight="bolder">Housing</Text>
            </Col>
            <Col>
              <Text weight="bolder">
                {+(heatOutput + electricityOutput + wasteOutput).toFixed(2)}
              </Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
        </Col>
      ) : null}
      {foodOutput > 0 ? (
        <Col xs={20}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Text weight="bolder">Food</Text>
            </Col>
            <Col>
              <Text weight="bolder">{foodOutput}</Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
        </Col>
      ) : null}
      {travelOutput > 0 ? (
        <Col xs={20}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Text weight="bolder">Travel</Text>
            </Col>
            <Col>
              <Text weight="bolder">{travelOutput}</Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
        </Col>
      ) : null}
    </Row>
  );
}
