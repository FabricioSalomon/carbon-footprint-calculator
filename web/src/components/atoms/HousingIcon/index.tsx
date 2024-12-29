import icon from "@/public/housing.png";
import { Image } from "antd";

interface HousingIconProps {
  width?: number;
}

export function HousingIcon({ width }: Readonly<HousingIconProps>) {
  return (
    <Image
      src={icon.src}
      preview={false}
      alt="Housing icon"
      width={width ?? 30}
    />
  );
}
