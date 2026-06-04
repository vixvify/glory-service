import { ApiResponse } from "../types";
import { AppError } from "../error";

export function formatSuccess<T>(
  data: T,
  statusCode: string = "SUCCESS",
  status: number = 200
): ApiResponse<T> {
  return {
    data,
    status,
    statusCode,
  };
}

export function formatError(error: unknown): ApiResponse<null> {
  const message = error instanceof Error ? error.message : String(error);
  const status = error instanceof AppError ? error.statusCode : 500;
  const statusCode = error instanceof AppError ? error.constructor.name.toUpperCase() : "INTERNAL_SERVER_ERROR";

  return {
    data: null,
    error: message,
    status,
    statusCode,
  };
}
