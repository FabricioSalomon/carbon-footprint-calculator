import { FormattedButton } from "./styles";
import {
  CustomButtonHierarchy,
  CustomButtonHierarchyEnum,
  TypedButtonProps,
} from "./types";

interface CustomButtonProps extends TypedButtonProps {
  hierarchy?: CustomButtonHierarchy;
}

export function CustomButton({
  hierarchy,
  ...rest
}: Readonly<CustomButtonProps>) {
  const hierarchyToTypeMap: {
    [key in CustomButtonHierarchyEnum]: "link" | "default" | "primary";
  } = {
    [CustomButtonHierarchyEnum.PRIMARY]: "primary",
    [CustomButtonHierarchyEnum.SECONDARY]: "default",
    [CustomButtonHierarchyEnum.TERTIARY]: "link",
  };
  return (
    <FormattedButton
      type={hierarchyToTypeMap[hierarchy ?? CustomButtonHierarchyEnum.PRIMARY]}
      {...rest}
    />
  );
}
