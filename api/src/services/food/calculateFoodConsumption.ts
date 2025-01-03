import { foods } from "@/mocks";
import { Food } from "@/models";
import { FatSecretApiRepository } from "@/repositories";
import {
  CalculateFoodConsumption,
  FatSecretServing,
  FromEnum,
  Serving,
  ToEnum,
} from "@/types";
import { ErrorHandler, UnitConverter, WEEKS_IN_A_YEAR } from "@/utils";

export interface ICalculateFoodConsumptionService {
  invoke(payload: CalculateFoodConsumption): Promise<number>;
}

export class CalculateFoodConsumptionService
  implements ICalculateFoodConsumptionService
{
  private readonly unit_converter: UnitConverter;

  constructor(private readonly fat_secret_api: FatSecretApiRepository) {
    this.fat_secret_api = new FatSecretApiRepository();
    this.unit_converter = new UnitConverter();
  }

  public async invoke({
    consumption,
    food_id,
    serving_id,
    token,
  }: CalculateFoodConsumption) {
    const food = this.validateFoodId(food_id);
    const response = await this.fat_secret_api.servingsByFoodId(food, token);
    const serving = this.validateServingId(response, serving_id);

    const consumption_in_g =
      Number(serving.metric_serving_amount) * consumption;
    const consumption_in_kg = this.unit_converter.convert({
      convert_to: ToEnum.KILOGRAMS,
      convert_from: FromEnum.GRAMS,
      value: consumption_in_g,
    });
    const weekly_emissions = food.kg_co2e_per_kg * consumption_in_kg;
    const anual_emissions = WEEKS_IN_A_YEAR * weekly_emissions;
    return anual_emissions;
  }

  private validateFoodId(food_id: number): Food {
    const food = foods.find(({ id }) => id === food_id);
    if (!food) {
      throw new ErrorHandler({
        status: 404,
        reason: "Food not found",
      });
    }
    return food;
  }

  private validateServingId(
    response: FatSecretServing,
    serving_id: number
  ): Serving {
    const serving = response.food.servings.serving.find(
      (data) => Number(data.serving_id) === serving_id
    );
    if (!serving) {
      throw new ErrorHandler({
        status: 404,
        reason: "Serving not found",
      });
    }
    return serving;
  }
}
