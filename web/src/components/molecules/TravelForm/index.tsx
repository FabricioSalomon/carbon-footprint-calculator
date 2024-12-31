import { FormItem } from "@/components/atoms";
import { Col, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["travel"];

export function TravelForm() {
  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Fuel" name={[...baseFormItemName, "fuel"]}>
              <Select
                placeholder="Select a fuel"
                options={[{ value: "teste", title: "teste" }]}
              />
            </FormItem>
          </Col>
        </Row>

        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Distance (miles)"
              name={[...baseFormItemName, "consumption"]}
            >
              <CustomInputNumber placeholder="Enter your distance" />
            </FormItem>
          </Col>
          <Col xs={24} md={10}>
            <FormItem
              label="Total (kgCO2e/yr)"
              name={[...baseFormItemName, "totalOutput"]}
            >
              <Input disabled readOnly />
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
