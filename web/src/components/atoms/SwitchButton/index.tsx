import React from "react";
import { CustomSwitch } from "./styles";
import { SwitchProps } from "antd";

interface SwitchButtonProps extends SwitchProps {}

export function SwitchButton(props: Readonly<SwitchButtonProps>) {
  return <CustomSwitch {...props} />;
}
