import {
  CalculateTravelConsumptionService,
  ICalculateTravelConsumptionService,
} from "@/services";
import { CalculateTravelConsumption } from "@/types";
import { ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[CalculateTravelConsumptionService]", () => {
  let service: ICalculateTravelConsumptionService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new CalculateTravelConsumptionService();
  });

  describe("[invoke]", () => {
    it("should calculate anual travel emissions", async () => {
      const req: CalculateTravelConsumption = {
        consumption: faker.number.int(),
        fuel_id: faker.number.int({
          max: 2,
          min: 0,
        }),
        distance: faker.number.int(),
      };

      const response = await service.invoke(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });

    it("should throw fuel not found error", async () => {
      const req: CalculateTravelConsumption = {
        consumption: faker.number.int(),
        fuel_id: faker.number.int({
          max: 5,
          min: 3,
        }),
        distance: faker.number.int(),
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
