import { FormItem } from "@/components/atoms";
import { Col, Input, Row } from "antd";
import { NamePath } from "antd/es/form/interface";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["housing", "waste"];

export function WasteForm() {
  return (
    <Row justify="center">
      <Col xs={24}>
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
