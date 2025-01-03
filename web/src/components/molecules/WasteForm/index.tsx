import { FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { WasteFields } from "@/types";
import { useCalculateWasteTotalOutput } from "@/useCases";
import { Col, Input, Row, Skeleton } from "antd";
import { NamePath } from "antd/es/form/interface";
import { debounce } from "lodash";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["housing", "waste"];

export function WasteForm() {
  const form = useFootprintForm();

  const { mutateAsync: calculate, isPending } = useCalculateWasteTotalOutput();

  async function handleFieldChange(
    fieldName: keyof WasteFields,
    value: string | number | null
  ) {
    const fields: WasteFields = form.getFieldValue(baseFormItemName) || [];
    fields.totalOutput = undefined;
    fields[fieldName] = value as number;

    debounceCalculate(fields);
  }

  const debounceCalculate = debounce(async (fields: WasteFields) => {
    if (fields.consumption !== undefined && fields.consumption > 0) {
      const { totalOutput } = await calculate({
        consumption: fields.consumption,
      });

      if (totalOutput >= 0) {
        fields.totalOutput = totalOutput;
      }

      form.setFieldsValue({
        housing: {
          waste: fields,
        },
      });
    }
  }, 2000);

  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Daily production (lb)"
              name={[...baseFormItemName, "consumption"]}
            >
              <CustomInputNumber
                onChange={(value) => handleFieldChange("consumption", value)}
                placeholder="Enter your daily production"
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
