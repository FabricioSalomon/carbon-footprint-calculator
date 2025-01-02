export type HeatFuelSource = {
  id: number;
  name: string;
  kg_co2_per_mmbtu: number;
  g_ch4_per_mmbtu: number;
  g_n2o_per_mmbtu: number;
};

export type TravelFuelSource = {
  id: number;
  name: string;
  kg_co2_per_gallon: number;
};
