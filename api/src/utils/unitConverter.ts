import {
  Convert,
  FromEnum,
  FromOptionsConvertion,
  FromOptionsMultiplier,
  ToEnum,
} from "@/types";
import { ErrorHandler } from "./errorHandler";

interface IUnitConverter {
  convert(payload: Convert): number;
}

export const CH4_GWP = 28;
export const N2O_GWP = 265;
export const DAYS_IN_A_YEAR = 365;
export const WEEKS_IN_A_YEAR = 52;
export const MONTHS_IN_A_YEAR = 12;

export class UnitConverter implements IUnitConverter {
  private readonly convertions: FromOptionsConvertion;

  constructor() {
    this.convertions = {
      [ToEnum.MMBTU]: {
        [FromEnum.THERMS]: 0.1,
      },
      [ToEnum.KILOGRAMS]: {
        [FromEnum.GRAMS]: 0.001,
        [FromEnum.POUNDS]: 0.453592,
        [FromEnum.METRIC_TON]: 1000,
      },
      [ToEnum.GRAMS]: {
        [FromEnum.OUNCES]: 0.0283495,
        [FromEnum.POUNDS]: 0.453592,
      },
      [ToEnum.METRIC_TON]: {
        [FromEnum.SHORT_TON]: 0.9071847,
      },
      [ToEnum.SHORT_TON]: {
        [FromEnum.POUNDS]: 0.0005,
      },
      [ToEnum.MWH]: {
        [FromEnum.KWH]: 0.001,
      },
    };
  }

  public convert({ value, convert_from, convert_to }: Convert): number {
    const convert_to_options = this.defineConvertToOptions(convert_to);
    const multiplier = this.defineMultiplier(convert_to_options, convert_from);
    return multiplier * value;
  }

  private defineConvertToOptions(
    convert_to: ToEnum
  ): Partial<FromOptionsMultiplier> {
    const to_options = this.convertions[convert_to];
    if (!to_options) {
      throw new ErrorHandler({
        status: 404,
        reason: "Invalid convert unit.",
      });
    }
    return to_options;
  }

  private defineMultiplier(
    convert_to: Partial<FromOptionsMultiplier>,
    convert_from: FromEnum
  ): number {
    const multiplier = convert_to[convert_from];
    if (!multiplier) {
      throw new ErrorHandler({
        status: 404,
        reason: "Invalid convert unit.",
      });
    }
    return multiplier;
  }
}
