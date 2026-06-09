import { AppError, BadRequestError } from "../error";

export function handleServiceError(error: unknown, fallbackMessage: string): never {
  if (error instanceof AppError) throw error;
  const message = error instanceof Error ? error.message : fallbackMessage;
  throw new BadRequestError(message, error);
}
