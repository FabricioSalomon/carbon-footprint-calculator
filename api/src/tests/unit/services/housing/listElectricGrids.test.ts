import {
  IListElectricGridsService,
  ListElectricGridsService,
} from "@/services";
import { jest } from "@jest/globals";

describe("[ListElectricGridsService]", () => {
  let service: IListElectricGridsService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new ListElectricGridsService();
  });

  describe("[invoke]", () => {
    it("should return all electric grids", () => {
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
