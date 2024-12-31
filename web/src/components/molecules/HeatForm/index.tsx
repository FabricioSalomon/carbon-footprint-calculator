import { CustomButton, FormItem } from "@/components/atoms";
import { FootprintFormFields, HeatFields } from "@/types";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useState } from "react";
import { Container, CustomCol, CustomInputNumber } from "./styles";

interface HeatFormProps {
  initialValue: HeatFields[];
}

const { useFormInstance } = Form;
const baseFormItemName: NamePath = ["housing", "heat"];

export function HeatForm({ initialValue }: Readonly<HeatFormProps>) {
  const form = useFormInstance<FootprintFormFields>();
  const [heatInputs, setHeatInputs] = useState<HeatFields[]>(initialValue);

  function handleFieldChange(
    fieldName: keyof HeatFields,
    value: string | number | null,
    index: number
  ): void {
    const items: HeatFields[] = form.getFieldValue(baseFormItemName) || [];

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

    if (shouldAddNewEmptyInputs(currentItem, index, items)) {
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

  function shouldAddNewEmptyInputs(
    currentItem: HeatFields,
    index: number,
    items: HeatFields[]
  ): boolean {
    return (
      !!currentItem.fuelSource &&
      currentItem.consumption !== undefined &&
      index === items.length - 1
    );
  }

  function handleRemoveInput(index: number): void {
    const inputsCopy = [...heatInputs];
    const indexToRemove = inputsCopy.findIndex(
      (input) => input.index === index
    );
    if (indexToRemove >= 0) {
      inputsCopy.splice(indexToRemove, 1);
      const newInputs = inputsCopy.map((input, index) => ({
        ...input,
        index,
      }));
      setHeatInputs(newInputs);
      form.setFieldsValue({
        housing: {
          heat: newInputs,
        },
      });
    }
  }

  return (
    <Row justify="center" gutter={[0, 16]}>
      {heatInputs?.map(({ index }: HeatFields) => (
        <Col xs={24} key={index}>
          <Container justify="space-between" align="middle">
            <Col xs={heatInputs.length === 1 ? 24 : 20}>
              <Row justify="center">
                <Col xs={24}>
                  <FormItem
                    label="Fuel"
                    name={[...baseFormItemName, index, "fuelSource"]}
                  >
                    <Select
                      placeholder="Select a fuel"
                      onChange={(value) =>
                        handleFieldChange("fuelSource", value, index)
                      }
                      options={[{ value: "teste", title: "teste" }]}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row justify="space-between" gutter={[0, 16]}>
                <CustomCol xs={24} md={12}>
                  <FormItem
                    label="Consumption (therms)"
                    name={[...baseFormItemName, index, "consumption"]}
                  >
                    <CustomInputNumber
                      placeholder="Enter your consumption"
                      onChange={(value) =>
                        handleFieldChange("consumption", value, index)
                      }
                    />
                  </FormItem>
                </CustomCol>
                <CustomCol xs={24} md={10}>
                  <FormItem
                    label="Total (kgCO2e/yr)"
                    name={[...baseFormItemName, index, "totalOutput"]}
                  >
                    <Input disabled readOnly />
                  </FormItem>
                </CustomCol>
              </Row>
            </Col>
            {index < heatInputs.length - 1 ? (
              <Col>
                <CustomButton
                  danger
                  hierarchy="tertiary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveInput(index)}
                />
              </Col>
            ) : null}
          </Container>
        </Col>
      ))}
    </Row>
  );
}
