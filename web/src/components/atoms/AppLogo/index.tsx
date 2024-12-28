import dark_surface_logo from "@/public/dark_surface_footprint.png";
import light_surface_logo from "@/public/footprint.png";
import { ThemeEnum } from "@/types";
import { Image } from "antd";

interface AppLogoProps {
  theme: ThemeEnum;
}

export function AppLogo({ theme }: Readonly<AppLogoProps>) {
  return (
    <Image
      alt="Carbon Footprint logo"
      src={
        theme === ThemeEnum.DARK
          ? dark_surface_logo.src
          : light_surface_logo.src
      }
    />
  );
}
