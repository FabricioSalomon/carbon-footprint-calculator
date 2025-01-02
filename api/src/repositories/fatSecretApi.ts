import { Food } from "@/models";
import { FatSecretServing } from "@/types";
import axios from "axios";

interface IFatSecretApiRepository {
  servingsByFoodId(food: Food, token: string): Promise<FatSecretServing>;
}

export class FatSecretApiRepository implements IFatSecretApiRepository {
  private readonly FORMAT = "json";
  private readonly URL = "https://platform.fatsecret.com/rest/food/v4";

  public async servingsByFoodId(food: Food, token: string) {
    const response = await axios.get<FatSecretServing>(this.URL, {
      params: {
        food_id: food.fat_secret_food_id,
        format: this.FORMAT,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
