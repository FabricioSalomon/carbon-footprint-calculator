import { heat_fuels } from "@/mocks";
import { HeatFuelSource } from "@/models";
import { CalculateHeatConsumption, FromEnum, ToEnum } from "@/types";
import {
  CH4_GWP,
  ErrorHandler,
  MONTHS_IN_A_YEAR,
  N2O_GWP,
  UnitConverter,
} from "@/utils";

export interface ICalculateHeatConsumptionService {
  invoke(payload: CalculateHeatConsumption): Promise<number>;
}

export class CalculateHeatConsumptionService
  implements ICalculateHeatConsumptionService
{
  private readonly unit_converter: UnitConverter;

  constructor() {
    this.unit_converter = new UnitConverter();
  }

  public async invoke({ consumption, fuel_id }: CalculateHeatConsumption) {
    const fuel = this.validateFuelId(fuel_id);

    const consumption_in_MMBTU = this.unit_converter.convert({
      convert_to: ToEnum.MMBTU,
      convert_from: FromEnum.THERMS,
      value: consumption,
    });

    const monthly_emissions_in_kg = this.calculateMonthlyEmissionsInKilograms(
      fuel,
      consumption_in_MMBTU
    );
    const anual_emissions_in_kg = MONTHS_IN_A_YEAR * monthly_emissions_in_kg;

    return anual_emissions_in_kg;
  }

  private validateFuelId(fuel_id: number): HeatFuelSource {
    const fuel = heat_fuels.find(({ id }) => id === fuel_id);
    if (!fuel) {
      throw new ErrorHandler({
        status: 404,
        reason: "Fuel not found",
      });
    }
    return fuel;
  }

  private calculateMonthlyEmissionsInKilograms(
    fuel: HeatFuelSource,
    consumption_in_MMBTU: number
  ): number {
    const co2_emissions_in_kg = fuel.kg_co2_per_mmbtu * consumption_in_MMBTU;

    const n2o_emissions_in_g =
      fuel.g_n2o_per_mmbtu * consumption_in_MMBTU * N2O_GWP;
    const ch4_emissions_in_g =
      fuel.g_ch4_per_mmbtu * consumption_in_MMBTU * CH4_GWP;

    const ch4_emissions = this.unit_converter.convert({
      convert_from: FromEnum.GRAMS,
      convert_to: ToEnum.KILOGRAMS,
      value: ch4_emissions_in_g,
    });
    const n2o_emissions = this.unit_converter.convert({
      convert_from: FromEnum.GRAMS,
      convert_to: ToEnum.KILOGRAMS,
      value: n2o_emissions_in_g,
    });

    const monthly_emissions_in_kg =
      co2_emissions_in_kg + ch4_emissions + n2o_emissions;
    return monthly_emissions_in_kg;
  }
}
