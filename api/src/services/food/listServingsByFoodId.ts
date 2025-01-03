import { foods } from "@/mocks";
import { Food, Serving } from "@/models";
import { FatSecretApiRepository } from "@/repositories";
import { ErrorHandler } from "@/utils";

export interface IListServingsByFoodIdService {
  invoke(food_id: number, token: string): Promise<Serving[]>;
}

export class ListServingsByFoodIdService
  implements IListServingsByFoodIdService
{
  constructor(private readonly fat_secret_api: FatSecretApiRepository) {
    this.fat_secret_api = new FatSecretApiRepository();
  }

  async invoke(food_id: number, token: string) {
    const food = this.validateFoodId(food_id);
    const response = await this.fat_secret_api.servingsByFoodId(food, token);
    const servings: Serving[] = response.food.servings.serving.map(
      ({ serving_id, serving_description }) => ({
        id: Number(serving_id),
        name: serving_description,
      })
    );
    return servings;
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
}
