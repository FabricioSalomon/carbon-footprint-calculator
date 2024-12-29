import icon from "@/public/car.png";
import { Image } from "antd";

interface CarIconProps {
  width?: number;
}

export function CarIcon({ width }: Readonly<CarIconProps>) {
  return (
    <Image src={icon.src} preview={false} alt="Car icon" width={width ?? 25} />
  );
}
