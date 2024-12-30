import { FootprintFormFields } from "@/types";
import { Form, FormInstance } from "antd";

const { useFormInstance } = Form;

export function useFootprintForm(): FormInstance<FootprintFormFields> {
  return useFormInstance<FootprintFormFields>();
}
