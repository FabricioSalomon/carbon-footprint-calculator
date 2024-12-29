import { ThemeEnum } from "@/types";

export type States = {
  theme: ThemeEnum;
  currentPage: number;
};

export type Methods = {
  handleSelectPage: (page: number) => void;
};

export type Context = States & Methods;
