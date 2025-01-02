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

export class UnitConverter implements IUnitConverter {
  private readonly convertions: FromOptionsConvertion = {
    [ToEnum.MM_BTU]: {
      [FromEnum.THERMS]: 0.1,
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
  };

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
