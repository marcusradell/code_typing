import { ErrorRequestHandler } from "express";
import { ValidationError } from "./client_error";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof ZodError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
};
