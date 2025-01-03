import {
  CalculateElectricityConsumptionService,
  ICalculateElectricityConsumptionService,
} from "@/services";
import { CalculateElectricityConsumption } from "@/types";
import { ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[CalculateElectricityConsumptionService]", () => {
  let service: ICalculateElectricityConsumptionService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new CalculateElectricityConsumptionService();
  });

  describe("[invoke]", () => {
    it("should calculate anual electricity emissions", async () => {
      const req: CalculateElectricityConsumption = {
        consumption: faker.number.int(),
        grid_id: faker.number.int({
          max: 26,
          min: 0,
        }),
      };

      const response = await service.invoke(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });

    it("should throw grid not found error", async () => {
      const req: CalculateElectricityConsumption = {
        consumption: faker.number.int(),
        grid_id: faker.number.int({
          max: 50,
          min: 27,
        }),
      };

      await expect(service.invoke(req)).rejects.toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Grid not found",
        })
      );
    });
  });
});
