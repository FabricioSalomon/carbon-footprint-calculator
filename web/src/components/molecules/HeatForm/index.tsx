import { FootprintFormFields, Heat } from "@/types";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useState } from "react";

interface HeatFormProps {
  initialValue: Heat[];
}

const { useFormInstance } = Form;
const baseFormItemName: NamePath = ["housing", "heat"];

export function HeatForm({ initialValue }: Readonly<HeatFormProps>) {
  const form = useFormInstance<FootprintFormFields>();
  const [heatInputs, setHeatInputs] = useState<Heat[]>(initialValue);

  function handleFieldChange(
    fieldName: keyof Heat,
    value: string | number | null,
    index: number
  ): void {
    const items: Heat[] = form.getFieldValue(baseFormItemName) || [];

    const currentItem = items[index];
    if (fieldName === "fuelSource") {
      currentItem.fuelSource = value as string;
    } else {
      currentItem[fieldName] = value as number;
    }

    // Update display value if both fields are filled
    if (currentItem.fuelSource && currentItem.consumption !== undefined) {
      //  items[index].totalOutput =
    }

    form.setFieldsValue({
      housing: {
        heat: items,
      },
    });

    if (
      currentItem.fuelSource &&
      currentItem.consumption !== undefined &&
      index === items.length - 1
    ) {
      items.push({
        index: items.length,
        fuelSource: undefined,
        consumption: undefined,
        totalOutput: undefined,
      });

      form.setFieldsValue({
        housing: {
          heat: items,
        },
      });
      setHeatInputs(items);
    }
  }

  return (
    <Row justify="center">
      {heatInputs?.map(({ index }: Heat) => (
        <Col xs={24} key={index}>
          <Row justify="center">
            <Col xs={24}>
              <Form.Item name={[...baseFormItemName, index, "fuelSource"]}>
                <Select
                  placeholder="Select an option"
                  onChange={(value) =>
                    handleFieldChange("fuelSource", value, index)
                  }
                  options={[{ value: "teste", title: "teste" }]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[0, 16]}>
            <Col xs={12}>
              <Form.Item name={[...baseFormItemName, index, "consumption"]}>
                <InputNumber
                  placeholder="Enter a number"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleFieldChange("consumption", value, index)
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={10}>
              <Form.Item name={[...baseFormItemName, index, "totalOutput"]}>
                <Input disabled readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}
