import { QueryKey } from "@tanstack/react-query";

enum QueryKeysEnum {
  useGetAllFoods = "useGetAllFoods",
  useListAllSubRegionGrids = "useListAllSubRegionGrids",
  useListAllHeatFuelSources = "useListAllHeatFuelSources",
  useGetAllServingsByFoodId = "useGetAllServingsByFoodId",
}

type QueryKeyList = {
  [key in QueryKeysEnum]: QueryKey;
};

export const queryKeys: QueryKeyList = {
  useGetAllFoods: ["foods-list"],
  useGetAllServingsByFoodId: ["servings-by-food-id"],
  useListAllSubRegionGrids: ["sub-region-grids-list"],
  useListAllHeatFuelSources: ["heat-fuel-sources-list"],
};
