import Joi from "joi";

export const listFoodSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

export const listServingsByFoodIdSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
