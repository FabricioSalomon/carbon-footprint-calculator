import { Subtitle, Text } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { Electricity, FootprintFormFields, Heat, Waste } from "@/types";
import { Col, Row } from "antd";

export function HousingSummary() {
  const form = useFootprintForm();
  const formFields: FootprintFormFields = form.getFieldsValue(true);

  const heat = defineHeatFields();
  const electricity = defineElectricityFields();
  const waste = defineWasteFields();
  const totalEnergyOutput = defineTotalEnergyOutput();

  function defineHeatFields(): Heat[] | undefined {
    const heat = formFields.housing.heat;
    if (heat) {
      const fields = heat.filter(
        (input) =>
          !!input.totalOutput &&
          !!input.consumption &&
          input.fuelSource !== undefined &&
          input.fuelSource >= 0
      );
      if (hasArrayFields(fields)) {
        return fields;
      }
      return undefined;
    }
    return undefined;
  }

  function hasArrayFields(
    fields: Partial<Heat>[] | undefined
  ): fields is Heat[] {
    return !!fields && fields.length > 0;
  }

  function defineElectricityFields(): Electricity | undefined {
    const electricityFields = formFields.housing.electricity;
    if (hasFields(electricityFields)) {
      return electricityFields;
    }
    return undefined;
  }

  function defineWasteFields(): Waste | undefined {
    const wasteFields = formFields.housing.waste;
    if (hasFields(wasteFields)) {
      return wasteFields;
    }
    return undefined;
  }

  function hasFields(
    fields: Partial<Waste | Electricity> | undefined
  ): fields is Waste | Electricity {
    return !!fields && !!fields.totalOutput && !!fields.consumption;
  }

  function defineTotalEnergyOutput(): number {
    let total = 0;
    if (!!heat?.length) {
      total += heat.reduce((prev, curr) => prev + (curr.totalOutput ?? 0), 0);
    }
    if (electricity) {
      total += electricity.totalOutput;
    }
    return total;
  }

  return (
    <Row justify="center" gutter={[0, 32]}>
      {!heat && !electricity && !waste ? (
        <Text
          weight="bold"
          style={{
            textAlign: "center",
          }}
        >
          Well... it looks like you&apos;re rushing a little. What about going
          back and filling out the Housing Form information?
        </Text>
      ) : null}
      {(heat && heat.length > 0) ||
      (electricity && electricity.totalOutput > 0) ? (
        <Col xs={24}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Subtitle>Energy</Subtitle>
            </Col>
            <Col>
              <Text weight="bolder">{+totalEnergyOutput.toFixed(2)}</Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
          {heat ? (
            <Row justify="space-between" align="middle">
              <Col xs={10}>
                <Text weight="bolder">Heat</Text>
              </Col>
              <Col>
                <Text weight="bolder">
                  {heat?.reduce(
                    (prev, curr) => prev + (curr.totalOutput ?? 0),
                    0
                  )}
                </Text>
                <Text> kgCO2e/yr</Text>
              </Col>
            </Row>
          ) : null}
          {electricity ? (
            <Row justify="space-between" align="middle">
              <Col xs={12}>
                <Text weight="bolder">Electricity</Text>
              </Col>
              <Col>
                <Text weight="bolder">{electricity.totalOutput}</Text>
                <Text> kgCO2e/yr</Text>
              </Col>
            </Row>
          ) : null}
        </Col>
      ) : null}
      {waste ? (
        <Col xs={24}>
          <Row justify="space-between" align="middle">
            <Col xs={12}>
              <Subtitle>Waste</Subtitle>
            </Col>
            <Col>
              <Text weight="bolder">{waste.totalOutput}</Text>
              <Text> kgCO2e/yr</Text>
            </Col>
          </Row>
        </Col>
      ) : null}
    </Row>
  );
}
