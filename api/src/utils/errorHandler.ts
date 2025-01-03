import { BaseError } from "@/types";

export interface IErrorHandler {
  throwError(error: unknown): BaseError;
}

export class ErrorHandler extends Error implements IErrorHandler {
  constructor(
    private readonly base_error: BaseError = {
      metadata: {},
      reason: "Internal server error",
      status: 500,
    }
  ) {
    super(base_error.reason);
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }

  public throwError(error: unknown): BaseError {
    if (this.isBaseError(error)) {
      return {
        reason: error.base_error.reason,
        status: error.base_error.status,
        metadata: error.base_error.metadata,
      };
    }
    return {
      reason: this.base_error.reason,
      status: this.base_error.status,
      metadata: this.base_error.metadata,
    };
  }

  private isBaseError(error: unknown): error is ErrorHandler {
    return (
      error !== null &&
      "base_error" in (error as ErrorHandler) &&
      "status" in (error as ErrorHandler).base_error &&
      "reason" in (error as ErrorHandler).base_error
    );
  }
}
