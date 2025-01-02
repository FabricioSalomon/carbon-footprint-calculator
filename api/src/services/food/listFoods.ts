import { foods } from "@/mocks";
import { Food } from "@/models";

type FoodData = Omit<Food, "fat_secret_food_id" | "kg_co2e_per_kg">;

export interface IListFoodsService {
  invoke(): FoodData[];
}

export class ListFoodsService implements IListFoodsService {
  invoke() {
    const mapped_foods = foods.map(({ id, name }) => ({
      id,
      name,
    }));

    return mapped_foods;
  }
}
