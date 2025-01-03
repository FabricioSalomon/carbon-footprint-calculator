import { waste } from "@/mocks";
import { CalculateWasteConsumption, FromEnum, ToEnum } from "@/types";
import { DAYS_IN_A_YEAR, UnitConverter } from "@/utils";

export interface ICalculateWasteConsumptionService {
  invoke(payload: CalculateWasteConsumption): Promise<number>;
}

export class CalculateWasteConsumptionService
  implements ICalculateWasteConsumptionService
{
  private readonly unit_converter: UnitConverter;

  constructor() {
    this.unit_converter = new UnitConverter();
  }

  public async invoke({ consumption }: CalculateWasteConsumption) {
    const daily_consumption_in_short_ton = this.unit_converter.convert({
      convert_to: ToEnum.SHORT_TON,
      convert_from: FromEnum.POUNDS,
      value: consumption,
    });

    const anual_emissions_in_short_ton =
      DAYS_IN_A_YEAR * daily_consumption_in_short_ton;

    const anual_emissions_in_kg = this.calculateAnualEmissionsInKilograms(
      anual_emissions_in_short_ton
    );

    return anual_emissions_in_kg;
  }

  private calculateAnualEmissionsInKilograms(
    consumption_in_short_ton: number
  ): number {
    const combusted_co2_emissions_in_ton =
      waste.ton_co2_per_short_ton_combusted * consumption_in_short_ton;
    const landfilled_co2_emissions_in_ton =
      waste.ton_co2_per_short_ton_landfilled * consumption_in_short_ton;

    const anual_co2_emissions_in_ton =
      combusted_co2_emissions_in_ton + landfilled_co2_emissions_in_ton;

    const anual_emissions_in_kg = this.unit_converter.convert({
      convert_to: ToEnum.KILOGRAMS,
      convert_from: FromEnum.METRIC_TON,
      value: anual_co2_emissions_in_ton,
    });

    return anual_emissions_in_kg;
  }
}
