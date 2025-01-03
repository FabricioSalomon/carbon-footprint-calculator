import { Convert, FromEnum, ToEnum } from "@/types";
import { ErrorHandler, IErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[ErrorHandler]", () => {
  let service: IErrorHandler;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new ErrorHandler();
  });

  describe("[invoke]", () => {
    it("should return base error object", () => {
      const response = service.throwError({
        base_error: {
          status: 404,
          reason: "Not found",
        },
      });

      const result = {
        reason: expect.any(String),
        status: expect.any(Number),
        metadata: expect.objectContaining({}),
      };
      expect(response).toStrictEqual(result);
    });

    it("should return generic error object", () => {
      const response = service.throwError({
        error: true,
      });

      const result = {
        status: 500,
        reason: "Internal server error",
        metadata: expect.objectContaining({}),
      };
      expect(response).toStrictEqual(result);
    });
  });
});
