import { FatSecretApiRepository } from "@/repositories";
import {
  CalculateFoodConsumptionService,
  ICalculateFoodConsumptionService,
} from "@/services";
import { CalculateFoodConsumption, FatSecretServing } from "@/types";
import { ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[CalculateFoodConsumptionService]", () => {
  let mockedFatSecretApiResponse: FatSecretServing;
  let service: ICalculateFoodConsumptionService;
  let fatSecretApi: FatSecretApiRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    fatSecretApi = FatSecretApiRepository.prototype;
    service = new CalculateFoodConsumptionService(fatSecretApi);
    mockedFatSecretApiResponse = {
      food: {
        servings: {
          serving: [
            {
              serving_id: faker.string.numeric(0),
              serving_description: faker.string.alpha(),
              serving_url: faker.string.alpha(),
              metric_serving_amount: faker.string.numeric(),
              metric_serving_unit: faker.string.alpha(),
              number_of_units: faker.string.numeric(),
              measurement_description: faker.string.alpha(),
              calories: faker.string.numeric(),
              carbohydrate: faker.string.numeric(),
              protein: faker.string.numeric(),
              fat: faker.string.numeric(),
              saturated_fat: faker.string.numeric(),
              polyunsaturated_fat: faker.string.numeric(),
              monounsaturated_fat: faker.string.numeric(),
              cholesterol: faker.string.numeric(),
              sodium: faker.string.numeric(),
              potassium: faker.string.numeric(),
              fiber: faker.string.numeric(),
              sugar: faker.string.numeric(),
              vitamin_a: faker.string.numeric(),
              vitamin_c: faker.string.numeric(),
              calcium: faker.string.numeric(),
              iron: faker.string.numeric(),
            },
          ],
        },
      },
    };
  });

  describe("[invoke]", () => {
    it("should calculate anual food emissions", async () => {
      const req: CalculateFoodConsumption = {
        consumption: faker.number.int(),
        food_id: faker.number.int({
          max: 5,
          min: 0,
        }),
        serving_id: 0,
        token: faker.internet.jwt(),
      };

      jest
        .spyOn(fatSecretApi, "servingsByFoodId")
        .mockResolvedValueOnce(mockedFatSecretApiResponse);
      const response = await service.invoke(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });

    it("should throw food not found error", async () => {
      const req: CalculateFoodConsumption = {
        consumption: faker.number.int(),
        food_id: faker.number.int({
          max: 10,
          min: 6,
        }),
        serving_id: 0,
        token: faker.internet.jwt(),
      };

      jest
        .spyOn(fatSecretApi, "servingsByFoodId")
        .mockResolvedValueOnce(mockedFatSecretApiResponse);

      await expect(service.invoke(req)).rejects.toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Food not found",
        })
      );
    });

    it("should throw serving not found error", async () => {
      const req: CalculateFoodConsumption = {
        consumption: faker.number.int(),
        food_id: faker.number.int({
          max: 5,
          min: 0,
        }),
        serving_id: 1,
        token: faker.internet.jwt(),
      };

      jest
        .spyOn(fatSecretApi, "servingsByFoodId")
        .mockResolvedValueOnce(mockedFatSecretApiResponse);

      await expect(service.invoke(req)).rejects.toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Serving not found",
        })
      );
    });
  });
});
