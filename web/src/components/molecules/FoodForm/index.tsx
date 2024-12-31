import { FormItem } from "@/components/atoms";
import { Col, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["food"];

export function FoodForm() {
  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Food" name={[...baseFormItemName, "food"]}>
              <Select
                placeholder="Select a food"
                options={[{ value: "teste", title: "teste" }]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Serving" name={[...baseFormItemName, "serving"]}>
              <Select
                placeholder="Select a serving"
                options={[{ value: "teste", title: "teste" }]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Consumption (oz)"
              name={[...baseFormItemName, "consumption"]}
            >
              <CustomInputNumber placeholder="Enter your consumption" />
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
