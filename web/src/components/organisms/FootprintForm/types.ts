import { FuelSourceEnum } from "@/types/dto";
import { EGridSubRegionEnum } from "@/types/dto/EGridSubRegionEnum";

export type Heat = {
  consumption: number;
  fuel_source: FuelSourceEnum;
};

export type Electricity = {
  consumption: number;
  e_grid_subregion: EGridSubRegionEnum;
};

export type Housing = {
  heat?: Heat[];
  electricity?: Electricity;
};

export type FootprintFormInitialValues = {
  housing: Housing;
};
