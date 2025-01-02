import { CustomButton, FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { TravelFields } from "@/types";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useState } from "react";
import { Container, CustomCol, CustomInputNumber } from "./styles";
import { useListAllVehiclesFuelSources } from "@/useCases/useListAllVehiclesFuelSources";

interface TravelFormProps {
  initialValue: TravelFields[];
}

const baseFormItemName: NamePath = ["travel"];

export function TravelForm({ initialValue }: Readonly<TravelFormProps>) {
  const form = useFootprintForm();
  const [travelInputs, setTravelInputs] =
    useState<TravelFields[]>(initialValue);

  const {
    data: vehicleFuels,
    isLoading: isGettingFuels,
    isError: errorGettingFuels,
  } = useListAllVehiclesFuelSources();

  function handleFieldChange(
    fieldName: keyof TravelFields,
    value: string | number | null,
    index: number
  ): void {
    const items: TravelFields[] = form.getFieldValue(baseFormItemName) || [];

    const currentItem = items[index];
    if (fieldName === "fuel") {
      currentItem.fuel = value as string;
    } else {
      currentItem[fieldName] = value as number;
    }

    // Update display value if both fields are filled
    if (currentItem.fuel && currentItem.consumption !== undefined) {
      //  items[index].totalOutput =
    }

    form.setFieldsValue({
      travel: items,
    });

    if (shouldAddNewEmptyInputs(currentItem, index, items)) {
      items.push({
        index: items.length,
        fuel: undefined,
        consumption: undefined,
        totalOutput: undefined,
      });

      form.setFieldsValue({
        travel: items,
      });
      setTravelInputs(items);
    }
  }

  function shouldAddNewEmptyInputs(
    currentItem: TravelFields,
    index: number,
    items: TravelFields[]
  ): boolean {
    return (
      !!currentItem.fuel &&
      currentItem.distance !== undefined &&
      currentItem.consumption !== undefined &&
      index === items.length - 1
    );
  }

  function handleRemoveInput(index: number): void {
    const inputsCopy = [...travelInputs];
    const indexToRemove = inputsCopy.findIndex(
      (input) => input.index === index
    );
    if (indexToRemove >= 0) {
      inputsCopy.splice(indexToRemove, 1);
      const newInputs = inputsCopy.map((input, index) => ({
        ...input,
        index,
      }));
      setTravelInputs(newInputs);
      form.setFieldsValue({
        travel: newInputs,
      });
    }
  }

  return (
    <Row justify="center" gutter={[0, 16]}>
      {travelInputs?.map(({ index }: TravelFields) => (
        <Col xs={24} key={index}>
          <Container justify="space-between" align="middle">
            <Col xs={travelInputs.length === 1 ? 24 : 20}>
              <Row justify="center">
                <Col xs={24}>
                  <FormItem
                    label="Fuel"
                    name={[...baseFormItemName, index, "fuel"]}
                  >
                    <Select
                      placeholder="Select a fuel"
                      onChange={(value) =>
                        handleFieldChange("fuel", value, index)
                      }
                      options={vehicleFuels?.map(({ id, name }) => ({
                        label: name,
                        value: id,
                      }))}
                      disabled={
                        errorGettingFuels ||
                        (vehicleFuels && vehicleFuels.length === 0)
                      }
                      loading={isGettingFuels}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row justify="space-between" gutter={[0, 16]}>
                <CustomCol xs={24} md={12}>
                  <FormItem
                    label="Vehicle Consumption (gallons/mile)"
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
                    label="Distance travelled (miles)"
                    name={[...baseFormItemName, index, "distance"]}
                  >
                    <CustomInputNumber
                      placeholder="Enter your distance"
                      onChange={(value) =>
                        handleFieldChange("distance", value, index)
                      }
                    />
                  </FormItem>
                </CustomCol>
              </Row>
              <Row justify="space-between" gutter={[0, 16]}>
                <CustomCol xs={24}>
                  <FormItem
                    label="Total (kgCO2e/yr)"
                    name={[...baseFormItemName, index, "totalOutput"]}
                  >
                    <Input disabled readOnly />
                  </FormItem>
                </CustomCol>
              </Row>
            </Col>
            {index < travelInputs.length - 1 ? (
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
