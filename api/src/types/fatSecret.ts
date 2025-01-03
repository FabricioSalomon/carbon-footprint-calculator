export type Serving = {
  serving_id: string;
  serving_description: string;
  serving_url: string;
  metric_serving_amount: string;
  metric_serving_unit: string;
  number_of_units: string;
  measurement_description: string;
  calories: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  saturated_fat: string;
  polyunsaturated_fat: string;
  monounsaturated_fat: string;
  cholesterol: string;
  sodium: string;
  potassium: string;
  fiber: string;
  sugar: string;
  vitamin_a: string;
  vitamin_c: string;
  calcium: string;
  iron: string;
};

export type ServingObjects = {
  serving: Serving[];
};

export type Food = {
  servings: ServingObjects;
};

export type FatSecretServing = {
  food: Food;
};
