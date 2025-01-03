import { travel_fuels } from "@/mocks";
import { TravelFuelSource } from "@/models";
import { CalculateTravelConsumption } from "@/types";
import { DAYS_IN_A_YEAR, ErrorHandler } from "@/utils";

export interface ICalculateTravelConsumptionService {
  invoke(payload: CalculateTravelConsumption): Promise<number>;
}

export class CalculateTravelConsumptionService
  implements ICalculateTravelConsumptionService
{
  public async invoke({
    fuel_id,
    distance,
    consumption,
  }: CalculateTravelConsumption) {
    const travel = this.validateFuelId(fuel_id);
    const daily_consumption_in_gallons = distance * consumption;

    const anual_emissions_in_kg =
      daily_consumption_in_gallons * travel.kg_co2_per_gallon * DAYS_IN_A_YEAR;

    return anual_emissions_in_kg;
  }

  private validateFuelId(travel_id: number): TravelFuelSource {
    const travel = travel_fuels.find(({ id }) => id === travel_id);
    if (!travel) {
      throw new ErrorHandler({
        status: 404,
        reason: "Fuel not found",
      });
    }
    return travel;
  }
}
