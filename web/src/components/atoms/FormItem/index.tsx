import { NamePath } from "antd/es/form/interface";
import { ReactNode } from "react";
import { CustomItem } from "./styles";

interface FormItemProps {
  name: NamePath[];
  noStyle?: boolean;
  children: ReactNode;
}

export function FormItem({ children, name, noStyle }: Readonly<FormItemProps>) {
  return (
    <CustomItem noStyle={noStyle} name={name}>
      {children}
    </CustomItem>
  );
}
