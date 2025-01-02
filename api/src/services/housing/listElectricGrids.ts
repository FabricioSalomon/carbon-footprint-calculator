import { grids } from "@/mocks";
import { HeatFuelSource } from "@/models";

type FuelSource = Pick<HeatFuelSource, "id" | "name">;

export interface IListElectricGridsService {
  invoke(): FuelSource[];
}

export class ListElectricGridsService implements IListElectricGridsService {
  invoke() {
    const mapped_fuels = grids.map(({ id, name, arconym }) => ({
      id,
      name: `${name} (${arconym})`,
    }));
    return mapped_fuels;
  }
}
