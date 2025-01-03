import { FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { Food, FoodFields } from "@/types";
import {
  useCalculateFoodTotalOutput,
  useListAllFoods,
  useListAllServingsByFoodId,
} from "@/useCases";
import { Col, Form, Input, Row, Select, Skeleton } from "antd";
import { NamePath } from "antd/es/form/interface";
import { debounce } from "lodash";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["food"];

const { useWatch } = Form;

export function FoodForm() {
  const form = useFootprintForm();
  const foodId = useWatch([...baseFormItemName, "foodId"], form);

  const { mutateAsync: calculate, isPending } = useCalculateFoodTotalOutput();

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

  async function handleFieldChange(
    fieldName: keyof FoodFields,
    value: string | number | null
  ) {
    const fields: FoodFields = form.getFieldValue(baseFormItemName) || [];
    fields.totalOutput = undefined;
    if (fieldName === "foodId" && value !== foodId) {
      fields.serving = undefined;
    }
    fields[fieldName] = value as number;

    debounceCalculate(fields);
  }

  const debounceCalculate = debounce(async (fields: FoodFields) => {
    if (hasAllFields(fields)) {
      const { totalOutput } = await calculate({
        food_id: fields.foodId,
        serving_id: fields.serving,
        consumption: fields.consumption,
      });

      if (totalOutput >= 0) {
        fields.totalOutput = totalOutput;
      }

      form.setFieldsValue({
        food: fields,
      });
    }
  }, 2000);

  function hasAllFields(fields: Partial<Food>): fields is Food {
    return (
      fields.consumption !== undefined &&
      fields.consumption > 0 &&
      fields.foodId !== undefined &&
      fields.foodId >= 0 &&
      fields.serving !== undefined &&
      fields.serving >= 0
    );
  }

  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem
              label="Main food group consumption"
              name={[...baseFormItemName, "foodId"]}
            >
              {isGettingFoods ? (
                <Skeleton.Input size="small" block active />
              ) : (
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  onChange={(value) => handleFieldChange("foodId", value)}
                  placeholder="Select a food"
                  options={foods?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  disabled={
                    errorGettingFoods || !foods || (foods && foods.length === 0)
                  }
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24}>
            <FormItem label="Serving" name={[...baseFormItemName, "serving"]}>
              {isGettingServings ? (
                <Skeleton.Input size="small" block active />
              ) : (
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  onChange={(value) => handleFieldChange("serving", value)}
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
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Weekly serving quantities"
              name={[...baseFormItemName, "consumption"]}
            >
              <CustomInputNumber
                onChange={(value) => handleFieldChange("consumption", value)}
                placeholder="Enter your weekly consumption"
              />
            </FormItem>
          </Col>
          <Col xs={24} md={10}>
            <FormItem
              label="Total (kgCO2e/yr)"
              name={[...baseFormItemName, "totalOutput"]}
            >
              {isPending ? (
                <Skeleton.Input size="small" block active />
              ) : (
                <Input readOnly />
              )}
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
