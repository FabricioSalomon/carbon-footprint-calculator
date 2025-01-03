import {
  CalculateHeatConsumptionService,
  ICalculateHeatConsumptionService,
} from "@/services";
import { CalculateHeatConsumption } from "@/types";
import { ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[CalculateHeatConsumptionService]", () => {
  let service: ICalculateHeatConsumptionService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new CalculateHeatConsumptionService();
  });

  describe("[invoke]", () => {
    it("should calculate anual heat emissions", async () => {
      const req: CalculateHeatConsumption = {
        consumption: faker.number.int(),
        fuel_id: faker.number.int({
          max: 2,
          min: 0,
        }),
      };

      const response = await service.invoke(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });

    it("should throw fuel not found error", async () => {
      const req: CalculateHeatConsumption = {
        consumption: faker.number.int(),
        fuel_id: faker.number.int({
          max: 5,
          min: 3,
        }),
      };

      await expect(service.invoke(req)).rejects.toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Fuel not found",
        })
      );
    });
  });
});
