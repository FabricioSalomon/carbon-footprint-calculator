export type Heat = {
  index: number;
  consumption: number;
  fuelSource: number;
  totalOutput: number;
};

export type HeatFields = Partial<Heat> & {
  index: number;
};

export type Electricity = {
  consumption: number;
  eGridSubRegion: number;
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
  foodId: number;
  serving: number;
  consumption: number;
  totalOutput: number;
};

export type FoodFields = Partial<Food>;

export type Travel = {
  fuel: number;
  index: number;
  distance: number;
  consumption: number;
  totalOutput: number;
};

export type TravelFields = Partial<Travel> & {
  index: number;
};

export type FootprintFormFields = {
  housing: Housing;
  food: FoodFields;
  travel: TravelFields[];
};
