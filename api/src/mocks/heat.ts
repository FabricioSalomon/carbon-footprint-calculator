import { HeatFuelSource } from "@/models";

export const heat_fuels: HeatFuelSource[] = [
  {
    id: 0,
    name: "Motor Gasoline",
    kg_co2_per_mmbtu: 70.22,
    g_ch4_per_mmbtu: 3.0,
    g_n2o_per_mmbtu: 0.6,
  },
  {
    id: 1,
    name: "Natural Gas",
    kg_co2_per_mmbtu: 53.06,
    g_ch4_per_mmbtu: 1.0,
    g_n2o_per_mmbtu: 0.1,
  },
  {
    id: 2,
    name: "Liquefied Petroleum Gases (LPG)",
    kg_co2_per_mmbtu: 61.71,
    g_ch4_per_mmbtu: 3.0,
    g_n2o_per_mmbtu: 0.6,
  },
];
