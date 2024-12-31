export enum FuelSourceEnum {
  NG = "Natural Gas",
  GAS = "Motor Gasoline",
  LPG = "Liquefied Petroleum Gases (LPG)",
}

export type FuelSource = {
  id: string;
  name: FuelSourceEnum;
};

export type TravelFuelSource = {
  id: string;
  name: FuelSourceEnum;
};
