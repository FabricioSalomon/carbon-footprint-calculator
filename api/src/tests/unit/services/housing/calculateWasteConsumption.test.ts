import {
  CalculateWasteConsumptionService,
  ICalculateWasteConsumptionService,
} from "@/services";
import { CalculateWasteConsumption } from "@/types";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[CalculateWasteConsumptionService]", () => {
  let service: ICalculateWasteConsumptionService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new CalculateWasteConsumptionService();
  });

  describe("[invoke]", () => {
    it("should calculate anual waste emissions", async () => {
      const req: CalculateWasteConsumption = {
        consumption: faker.number.int(),
      };

      const response = await service.invoke(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });
  });
});
