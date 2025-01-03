import { CustomButton, FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { Heat, HeatFields } from "@/types";
import {
  useCalculateHeatTotalOutput,
  useListAllHeatFuelSources,
} from "@/useCases";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Skeleton } from "antd";
import { NamePath } from "antd/es/form/interface";
import { debounce } from "lodash";
import { useState } from "react";
import { Container, CustomCol, CustomInputNumber } from "./styles";

interface HeatFormProps {
  initialValue: HeatFields[];
}

const baseFormItemName: NamePath = ["housing", "heat"];

export function HeatForm({ initialValue }: Readonly<HeatFormProps>) {
  const form = useFootprintForm();
  const [heatInputs, setHeatInputs] = useState<HeatFields[]>(initialValue);

  const { mutateAsync: calculate, isPending } = useCalculateHeatTotalOutput();

  const {
    data: heatFuels,
    isLoading: isGettingFuels,
    isError: errorGettingFuels,
  } = useListAllHeatFuelSources();

  function handleFieldChange(
    fieldName: keyof HeatFields,
    value: string | number | null,
    index: number
  ): void {
    const items: HeatFields[] = form.getFieldValue(baseFormItemName) || [];

    const currentItem = items[index];
    currentItem[fieldName] = value as number;

    if (
      currentItem.fuelSource !== undefined &&
      currentItem.fuelSource >= 0 &&
      currentItem.consumption !== undefined
    ) {
      debounceCalculate(currentItem, items, index);
    }
  }

  const debounceCalculate = debounce(
    async (fields: HeatFields, items: HeatFields[], index: number) => {
      if (hasAllFields(fields)) {
        const { totalOutput } = await calculate({
          consumption: fields.consumption,
          fuel_source_id: fields.fuelSource,
        });

        if (totalOutput >= 0) {
          items[index].totalOutput = totalOutput;
        }

        form.setFieldsValue({
          housing: {
            heat: items,
          },
        });
      }

      if (shouldAddNewEmptyInputs(fields, index, items)) {
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
    },
    2000
  );

  function hasAllFields(fields: Partial<Heat>): fields is Heat {
    return (
      fields.consumption !== undefined &&
      fields.consumption > 0 &&
      fields.fuelSource !== undefined &&
      fields.fuelSource >= 0
    );
  }

  function shouldAddNewEmptyInputs(
    currentItem: HeatFields,
    index: number,
    items: HeatFields[]
  ): boolean {
    return (
      currentItem.fuelSource !== undefined &&
      currentItem.fuelSource >= 0 &&
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
                    {isGettingFuels ? (
                      <Skeleton.Input size="small" block active />
                    ) : (
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        placeholder="Select a fuel"
                        onChange={(value) =>
                          handleFieldChange("fuelSource", value, index)
                        }
                        options={heatFuels?.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))}
                        disabled={
                          errorGettingFuels ||
                          !heatFuels ||
                          (heatFuels && heatFuels.length === 0)
                        }
                      />
                    )}
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
                    {isPending ? (
                      <Skeleton.Input size="small" block active />
                    ) : (
                      <Input readOnly />
                    )}
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
