export type CalculateHeatTotalOutputRequest = {
  consumption: number;
  fuel_source_id: number;
};

export type CalculateElectricityTotalOutputRequest = {
  consumption: number;
  e_grid_sub_region_id: number;
};

export type CalculateWasteTotalOutputRequest = {
  consumption: number;
};
