import { foods } from "@/mocks";
import { Serving } from "@/models";
import { FatSecretApiRepository } from "@/repositories";
import { ErrorHandler } from "@/utils";

export interface IListServingsByFoodIdService {
  invoke(food_id: number, token: string): Promise<Serving[]>;
}

export class ListServingsByFoodIdService
  implements IListServingsByFoodIdService
{
  constructor(private readonly fatSecretApi: FatSecretApiRepository) {
    this.fatSecretApi = new FatSecretApiRepository();
  }

  async invoke(food_id: number, token: string) {
    const food = foods.find(({ id }) => id === food_id);
    if (!food) {
      throw new ErrorHandler({
        status: 404,
        reason: "Food not found",
      });
    }
    const response = await this.fatSecretApi.servingsByFoodId(food, token);
    const servings: Serving[] = response.food.servings.serving.map(
      ({ serving_id, serving_description }) => ({
        id: Number(serving_id),
        name: serving_description,
      })
    );
    return servings;
  }
}
