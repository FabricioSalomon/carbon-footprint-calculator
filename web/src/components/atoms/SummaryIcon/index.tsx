import icon from "@/public/summary.png";
import { Image } from "antd";

interface SummaryIconProps {
  width?: number;
}

export function SummaryIcon({ width }: Readonly<SummaryIconProps>) {
  return (
    <Image
      src={icon.src}
      preview={false}
      alt="Summary icon"
      width={width ?? 25}
    />
  );
}
