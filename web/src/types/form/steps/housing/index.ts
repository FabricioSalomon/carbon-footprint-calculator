export type Heat = {
  index: number;
  consumption?: number;
  fuelSource?: string;
  totalOutput?: number;
};

export type Electricity = {
  consumption?: number;
  eGridSubRegion?: string;
  totalOutput?: number;
};

export type Housing = {
  heat?: Heat[];
  electricity?: Electricity;
};

export type FootprintFormFields = {
  housing: Housing;
};
