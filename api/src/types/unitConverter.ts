export enum FromEnum {
  THERMS = "therm",
  OUNCES = "oz",
  POUNDS = "lb",
  SHORT_TON = "short ton",
  GRAMS = "g",
  KWH = "kWh",
  METRIC_TON = "ton",
}

export enum ToEnum {
  MMBTU = "mmBtu",
  GRAMS = "g",
  KILOGRAMS = "kg",
  SHORT_TON = "short ton",
  METRIC_TON = "ton",
  MWH = "MWh",
}

export type FromOptionsMultiplier = {
  [key in FromEnum]: number;
};

export type FromOptionsConvertion = {
  [key in ToEnum]: Partial<FromOptionsMultiplier>;
};

export type Convert = {
  value: number;
  convert_to: ToEnum;
  convert_from: FromEnum;
};
