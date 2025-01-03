import Joi from "joi";

export const calculateTravelConsumption = Joi.object({
  distance: Joi.number().required(),
  consumption: Joi.number().required(),
  fuel_id: Joi.number().min(0).max(2).required(),
});
