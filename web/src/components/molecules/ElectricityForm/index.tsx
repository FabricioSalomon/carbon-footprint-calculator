import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";

const baseFormItemName: NamePath = ["housing", "electricity"];

export function ElectricityForm() {
  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <Form.Item name={[...baseFormItemName, "eGridSubRegion"]}>
              <Select
                placeholder="Select an option"
                options={[{ value: "teste", title: "teste" }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={12}>
            <Form.Item name={[...baseFormItemName, "consumption"]}>
              <InputNumber placeholder="Enter a number" />
            </Form.Item>
          </Col>
          <Col xs={10}>
            <Form.Item name={[...baseFormItemName, "totalOutput"]}>
              <Input disabled readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
