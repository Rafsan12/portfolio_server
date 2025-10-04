import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Something went wrong!";

  // Log error for debugging
  console.log("Error in globalErrorHandler:", err);

  // Handle Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = err.message.replace(/\n/g, " ");
  }
  // Handle Prisma validation errors
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 422;
    // Extract the specific error message (e.g., "Argument `id` is missing.")
    const errorLines = err.message.split("\n");
    const specificError = errorLines
      .find((line) => line.includes("Argument") && line.includes("is missing"))
      ?.trim();
    message = specificError
      ? specificError.replace("Argument ", "")
      : "Invalid data provided to Prisma.";
  }
  // Fallback for generic Error
  else if (err instanceof Error && !err.statusCode) {
    statusCode = 500;
    status = "error";
  }

  res.status(statusCode).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
