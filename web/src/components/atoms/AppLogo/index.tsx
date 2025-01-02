import darkSurfaceLogo from "@/public/dark_surface_footprint.png";
import { Image } from "antd";

export function AppLogo() {
  return (
    <Image
      preview={false}
      alt="Carbon Footprint logo"
      src={darkSurfaceLogo.src}
    />
  );
}
