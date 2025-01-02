import Joi from "joi";

export const listServingsByFoodIdSchema = Joi.object({
  food_id: Joi.number().required(),
});
