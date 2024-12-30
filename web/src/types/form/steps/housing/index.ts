export type Heat = {
  index: number;
  consumption: number;
  fuelSource: string;
  totalOutput: number;
};

export type HeatFields = Partial<Heat>;

export type Electricity = {
  consumption: number;
  eGridSubRegion: string;
  totalOutput: number;
};

export type ElectricityFields = Partial<Electricity>;

export type Waste = {
  consumption: number;
  totalOutput: number;
};

export type WasteFields = Partial<Waste>;

export type Housing = {
  heat?: HeatFields[];
  electricity?: ElectricityFields;
  waste?: WasteFields;
};

export type FootprintFormFields = {
  housing: Housing;
};
