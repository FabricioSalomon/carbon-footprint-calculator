import { grids } from "@/mocks";
import { Grid } from "@/models";
import { CalculateElectricityConsumption, FromEnum, ToEnum } from "@/types";
import {
  CH4_GWP,
  ErrorHandler,
  MONTHS_IN_A_YEAR,
  N2O_GWP,
  UnitConverter,
} from "@/utils";

export interface ICalculateElectricityConsumptionService {
  invoke(payload: CalculateElectricityConsumption): Promise<number>;
}

export class CalculateElectricityConsumptionService
  implements ICalculateElectricityConsumptionService
{
  private readonly unit_converter: UnitConverter;

  constructor() {
    this.unit_converter = new UnitConverter();
  }

  public async invoke({
    consumption,
    grid_id,
  }: CalculateElectricityConsumption) {
    const grid = this.validateGridId(grid_id);

    const consumption_in_MWh = this.unit_converter.convert({
      convert_to: ToEnum.MWH,
      convert_from: FromEnum.KWH,
      value: consumption,
    });

    const monthly_emissions_in_lb = this.calculateMonthlyEmissions(
      grid,
      consumption_in_MWh
    );
    const anual_emissions_in_lb = MONTHS_IN_A_YEAR * monthly_emissions_in_lb;
    const anual_emissions = this.unit_converter.convert({
      convert_from: FromEnum.POUNDS,
      convert_to: ToEnum.KILOGRAMS,
      value: anual_emissions_in_lb,
    });
    return anual_emissions;
  }

  private validateGridId(grid_id: number): Grid {
    const grid = grids.find(({ id }) => id === grid_id);
    if (!grid) {
      throw new ErrorHandler({
        status: 404,
        reason: "Grid not found",
      });
    }
    return grid;
  }

  private calculateMonthlyEmissions(
    grid: Grid,
    consumption_in_MWh: number
  ): number {
    const co2_emissions = grid.lb_co2_per_mwh * consumption_in_MWh;
    const n2o_emissions = grid.lb_n2o_per_mwh * consumption_in_MWh * N2O_GWP;
    const ch4_emissions = grid.lb_ch4_per_mwh * consumption_in_MWh * CH4_GWP;
    const monthly_emissions_in_lb =
      co2_emissions + ch4_emissions + n2o_emissions;
    return monthly_emissions_in_lb;
  }
}
