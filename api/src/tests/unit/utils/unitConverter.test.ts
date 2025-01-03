import { Convert, FromEnum, ToEnum } from "@/types";
import { UnitConverter, IUnitConverter, ErrorHandler } from "@/utils";
import { faker } from "@faker-js/faker/.";
import { jest } from "@jest/globals";

describe("[UnitConverter]", () => {
  let service: IUnitConverter;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    service = new UnitConverter();
  });

  describe("[invoke]", () => {
    it("should convert units", () => {
      const req: Convert = {
        convert_from: FromEnum.GRAMS,
        convert_to: ToEnum.KILOGRAMS,
        value: faker.number.int(1),
      };

      const response = service.convert(req);

      const result = expect.any(Number);
      expect(response).toStrictEqual(result);
    });

    it("should throw invalid convert unit error for wrong convert_to", () => {
      const req: Convert = {
        convert_from: FromEnum.GRAMS,
        convert_to: ToEnum.GRAMS,
        value: faker.number.int(1),
      };

      expect(() => service.convert(req)).toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Invalid convert unit.",
        })
      );
    });

    it("should throw invalid convert unit error for wrong convert_from", () => {
      const req: Convert = {
        value: faker.number.int(1),
        convert_from: FromEnum.GRAMS,
        convert_to: "wrong_unit" as ToEnum,
      };

      expect(() => service.convert(req)).toThrow(
        new ErrorHandler({
          status: 404,
          reason: "Invalid convert unit.",
        })
      );
    });
  });
});
