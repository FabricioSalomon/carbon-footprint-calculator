import { IListFoodsService, ListFoodsService } from "@/services";
import { jest } from "@jest/globals";

describe("[ListFoodsService]", () => {
  let service: IListFoodsService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new ListFoodsService();
  });

  describe("[invoke]", () => {
    it("should return all foods", () => {
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
