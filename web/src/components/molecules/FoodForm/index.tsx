import { FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { useListAllFoods, useListAllServingsByFoodId } from "@/useCases";
import { Col, Form, Input, Row, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useEffect } from "react";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["food"];

const { useWatch } = Form;

export function FoodForm() {
  const form = useFootprintForm();

  const foodId = useWatch([...baseFormItemName, "food"], form);

  useEffect(() => {
    form.setFieldValue(["food", "serving"], undefined);
  }, [foodId]);

  const {
    data: foods,
    isLoading: isGettingFoods,
    isError: errorGettingFoods,
  } = useListAllFoods();

  const {
    data: servings,
    isLoading: isGettingServings,
    isError: errorGettingServings,
  } = useListAllServingsByFoodId(foodId);

  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Food" name={[...baseFormItemName, "food"]}>
              <Select
                placeholder="Select a food"
                options={foods?.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                disabled={errorGettingFoods || (foods && foods.length === 0)}
                loading={isGettingFoods}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Serving" name={[...baseFormItemName, "serving"]}>
              <Select
                placeholder="Select a serving"
                options={servings?.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                disabled={
                  errorGettingServings ||
                  !servings ||
                  (servings && servings.length === 0)
                }
                loading={isGettingServings}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Serving quantity"
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
