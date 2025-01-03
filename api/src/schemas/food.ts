import Joi from "joi";

export const calculateFoodConsumption = Joi.object({
  food_id: Joi.number().min(0).max(5).required(),
  serving_id: Joi.number().min(0).required(),
  consumption: Joi.number().required(),
});

export const listServingsByFoodIdSchema = Joi.object({
  food_id: Joi.number().required(),
});
