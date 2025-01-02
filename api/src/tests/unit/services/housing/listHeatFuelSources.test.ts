import {
  IListHeatFuelSourcesService,
  ListHeatFuelSourcesService,
} from "@/services";
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

const { string, number, date } = faker;

describe("[ListHeatFuelSourcesService]", () => {
  let service: IListHeatFuelSourcesService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new ListHeatFuelSourcesService();
  });

  describe("[invoke]", () => {
    it("should return all heat fuel sources", () => {
      const response = service.invoke();

      const result = expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
        },
      ]);
      expect(response).toStrictEqual(result);
    });
  });
});
