import { QueryKey } from "@tanstack/react-query";

enum QueryKeysEnum {
  useListAllFoods = "useListAllFoods",
  useListAllSubRegionGrids = "useListAllSubRegionGrids",
  useListAllHeatFuelSources = "useListAllHeatFuelSources",
  useListAllServingsByFoodId = "useListAllServingsByFoodId",
  useListAllVehiclesFuelSources = "useListAllVehiclesFuelSources",
}

type QueryKeyList = {
  [key in QueryKeysEnum]: QueryKey;
};

export const queryKeys: QueryKeyList = {
  useListAllFoods: ["foods-list"],
  useListAllSubRegionGrids: ["sub-region-grids-list"],
  useListAllHeatFuelSources: ["heat-fuel-sources-list"],
  useListAllServingsByFoodId: ["servings-by-food-id-list"],
  useListAllVehiclesFuelSources: ["vehicle-fuel-sources-list"],
};
