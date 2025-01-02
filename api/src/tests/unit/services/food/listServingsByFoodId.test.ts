import { FatSecretApiRepository } from "@/repositories";
import {
  IListServingsByFoodIdService,
  ListServingsByFoodIdService,
} from "@/services";
import { FatSecretServing } from "@/types";
import { ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

describe("[ListServingsByFoodIdService]", () => {
  let service: IListServingsByFoodIdService;
  let mockedFatSecretApiResponse: FatSecretServing;
  let fatSecretApi: FatSecretApiRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    fatSecretApi = FatSecretApiRepository.prototype;
    service = new ListServingsByFoodIdService(fatSecretApi);
    mockedFatSecretApiResponse = {
      food: {
        servings: {
          serving: [
            {
              serving_id: faker.string.numeric(),
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
    it("should return all servings for food id", async () => {
      const mocked_food_id = faker.number.int({
        min: 0,
        max: 5,
      });
      const mocked_access_token = faker.internet.jwt();

      jest
        .spyOn(fatSecretApi, "servingsByFoodId")
        .mockResolvedValueOnce(mockedFatSecretApiResponse);

      const response = await service.invoke(
        mocked_food_id,
        mocked_access_token
      );

      const result = expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
        },
      ]);
      expect(response).toStrictEqual(result);
    });

    it("should throw food not found error", async () => {
      const mocked_food_id = faker.number.int({
        min: 6,
        max: 10,
      });
      const mocked_access_token = faker.internet.jwt();

      await expect(
        service.invoke(mocked_food_id, mocked_access_token)
      ).rejects.toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Food not found",
        })
      );
    });
  });
});
