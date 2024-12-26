import { Theme } from "@/theme";
import "styled-components";

type CustomTheme = Theme;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}
