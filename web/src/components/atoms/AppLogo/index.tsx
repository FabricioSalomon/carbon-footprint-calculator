import darkSurfaceLogo from "@/public/dark_surface_footprint.png";
import lightSurfaceLogo from "@/public/footprint.png";
import { ThemeEnum } from "@/types";
import { Image } from "antd";

interface AppLogoProps {
  theme: ThemeEnum;
}

export function AppLogo({ theme }: Readonly<AppLogoProps>) {
  return (
    <Image
      preview={false}
      alt="Carbon Footprint logo"
      src={
        theme === ThemeEnum.DARK ? darkSurfaceLogo.src : lightSurfaceLogo.src
      }
    />
  );
}
