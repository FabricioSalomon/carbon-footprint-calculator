import { FormItem } from "@/components/atoms";
import { Col, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["housing", "electricity"];

export function ElectricityForm() {
  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem name={[...baseFormItemName, "eGridSubRegion"]}>
              <Select
                placeholder="Select an electric grid"
                options={[{ value: "teste", title: "teste" }]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem name={[...baseFormItemName, "consumption"]}>
              <CustomInputNumber placeholder="Enter your consumption" />
            </FormItem>
          </Col>
          <Col xs={24} md={10}>
            <FormItem name={[...baseFormItemName, "totalOutput"]}>
              <Input disabled readOnly />
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
