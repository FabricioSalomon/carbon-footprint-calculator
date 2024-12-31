export type CalculateHeatTotalOutputRequest = {
  consumption: number;
  fuel_source_id: string;
};

export type CalculateElectricityTotalOutputRequest = {
  consumption: number;
  e_grid_sub_region_id: string;
};

export type CalculateWasteTotalOutputRequest = {
  consumption: number;
};
