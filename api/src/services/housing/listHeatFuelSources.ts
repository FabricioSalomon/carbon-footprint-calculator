import { heat_fuels } from "@/mocks";
import { HeatFuelSource } from "@/models";

type FuelSource = Pick<HeatFuelSource, "id" | "name">;

export interface IListHeatFuelSourcesService {
  invoke(): FuelSource[];
}

export class ListHeatFuelSourcesService implements IListHeatFuelSourcesService {
  invoke(): FuelSource[] {
    const mapped_fuels = heat_fuels.map(({ id, name }) => ({
      id,
      name,
    }));
    return mapped_fuels;
  }
}
