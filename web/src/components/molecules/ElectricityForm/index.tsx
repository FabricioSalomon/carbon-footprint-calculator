import { FormItem } from "@/components/atoms";
import { useFootprintForm } from "@/context";
import { Electricity, ElectricityFields } from "@/types";
import {
  useCalculateElectricityTotalOutput,
  useListAllSubRegionGrids,
} from "@/useCases";
import { Col, Input, Row, Select, Skeleton } from "antd";
import { NamePath } from "antd/es/form/interface";
import { debounce } from "lodash";
import { CustomInputNumber } from "./styles";

const baseFormItemName: NamePath = ["housing", "electricity"];

export function ElectricityForm() {
  const form = useFootprintForm();

  const { mutateAsync: calculate, isPending } =
    useCalculateElectricityTotalOutput();

  const {
    data: grids,
    isLoading: isGettingGrids,
    isError: errorGettingGrids,
  } = useListAllSubRegionGrids();

  async function handleFieldChange(
    fieldName: keyof ElectricityFields,
    value: string | number | null
  ) {
    const fields: ElectricityFields =
      form.getFieldValue(baseFormItemName) || [];
    fields.totalOutput = undefined;
    fields[fieldName] = value as number;

    debounceCalculate(fields);
  }

  const debounceCalculate = debounce(async (fields: ElectricityFields) => {
    if (hasAllFields(fields)) {
      const { totalOutput } = await calculate({
        consumption: fields.consumption,
        e_grid_sub_region_id: fields.eGridSubRegion,
      });

      if (totalOutput >= 0) {
        fields.totalOutput = totalOutput;
      }

      form.setFieldsValue({
        housing: {
          electricity: fields,
        },
      });
    }
  }, 2000);

  function hasAllFields(fields: Partial<Electricity>): fields is Electricity {
    return (
      fields.consumption !== undefined &&
      fields.consumption > 0 &&
      fields.eGridSubRegion !== undefined &&
      fields.eGridSubRegion >= 0
    );
  }

  return (
    <Row justify="center">
      <Col xs={24}>
        <Row justify="center">
          <Col xs={24}>
            <FormItem
              label="Grid"
              name={[...baseFormItemName, "eGridSubRegion"]}
            >
              {isGettingGrids ? (
                <Skeleton.Input size="small" block active />
              ) : (
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Select an electric grid"
                  onChange={(value) =>
                    handleFieldChange("eGridSubRegion", value)
                  }
                  options={grids?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  disabled={
                    errorGettingGrids || !grids || (grids && grids.length === 0)
                  }
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[0, 16]}>
          <Col xs={24} md={12}>
            <FormItem
              label="Monthly consumption (kWh)"
              name={[...baseFormItemName, "consumption"]}
            >
              <CustomInputNumber
                onChange={(value) => handleFieldChange("consumption", value)}
                placeholder="Enter your monthly consumption"
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
