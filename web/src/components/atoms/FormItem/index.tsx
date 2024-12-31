import { Form } from "antd";
import { NamePath } from "antd/es/form/interface";
import { ReactNode } from "react";

interface FormItemProps {
  name: NamePath[];
  label?: ReactNode;
  noStyle?: boolean;
  children: ReactNode;
}

export function FormItem({
  name,
  label,
  noStyle,
  children,
}: Readonly<FormItemProps>) {
  return (
    <Form.Item
      name={name}
      label={label}
      labelAlign="left"
      noStyle={noStyle}
      labelCol={{
        xs: 24,
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </Form.Item>
  );
}
