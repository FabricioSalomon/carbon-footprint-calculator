import { FuelSourceEnum } from "@/types/dto";
import { EGridSubRegionEnum } from "@/types/dto/EGridSubRegionEnum";

export type Heat = {
  consumption: number;
  fuelSource: FuelSourceEnum;
};

export type Electricity = {
  consumption: number;
  eGridSubRegion: EGridSubRegionEnum;
};

export type Housing = {
  heat?: Heat[];
  electricity?: Electricity;
};

export type FootprintFormInitialValues = {
  housing: Housing;
};
