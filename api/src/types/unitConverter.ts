export enum FromEnum {
  THERMS = "therm",
  OUNCES = "oz",
  POUNDS = "lb",
  SHORT_TON = "short ton",
}

export enum ToEnum {
  MM_BTU = "mmBtu",
  GRAMS = "g",
  SHORT_TON = "short ton",
  METRIC_TON = "ton",
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
