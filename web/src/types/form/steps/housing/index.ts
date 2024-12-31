export type Heat = {
  index: number;
  consumption: number;
  fuelSource: string;
  totalOutput: number;
};

export type HeatFields = Partial<Heat> & {
  index: number;
};

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

export type Food = {
  food: string;
  serving: string;
  consumption: number;
  totalOutput: number;
};

export type FoodFields = Partial<Food>;

export type Travel = {
  fuel: string;
  consumption: number;
  totalOutput: number;
};

export type TravelFields = Partial<Travel>;

export type FootprintFormFields = {
  housing: Housing;
  food: FoodFields;
  travel: TravelFields;
};
