import Joi from "joi";

export const calculateElectricityConsumption = Joi.object({
  consumption: Joi.number().required(),
  e_grid_sub_region_id: Joi.number().min(0).max(26).required(),
});

export const calculateHeatConsumption = Joi.object({
  consumption: Joi.number().required(),
  fuel_source_id: Joi.number().min(0).max(2).required(),
});

export const calculateWasteConsumption = Joi.object({
  consumption: Joi.number().required(),
});
