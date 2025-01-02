import { travel_fuels } from "@/mocks";
import { HeatFuelSource } from "@/models";

type FuelSource = Pick<HeatFuelSource, "id" | "name">;

export interface IListVehicleFuelSourcesService {
  invoke(): FuelSource[];
}

export class ListVehicleFuelSourcesService
  implements IListVehicleFuelSourcesService
{
  invoke() {
    const mapped_fuels = travel_fuels.map(({ id, name }) => ({
      id,
      name,
    }));
    return mapped_fuels;
  }
}
