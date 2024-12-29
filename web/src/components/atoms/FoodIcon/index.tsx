import icon from "@/public/food.png";
import { Image } from "antd";

interface FoodIconProps {
  width?: number;
}

export function FoodIcon({ width }: Readonly<FoodIconProps>) {
  return (
    <Image src={icon.src} preview={false} alt="Food icon" width={width ?? 25} />
  );
}
