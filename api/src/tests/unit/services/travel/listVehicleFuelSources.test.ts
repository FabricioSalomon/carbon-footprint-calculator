import {
  IListVehicleFuelSourcesService,
  ListVehicleFuelSourcesService,
} from "@/services";
import { jest } from "@jest/globals";

describe("[ListVehicleFuelSourcesService]", () => {
  let service: IListVehicleFuelSourcesService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new ListVehicleFuelSourcesService();
  });

  describe("[invoke]", () => {
    it("should return all vehicle fuel sources", () => {
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
