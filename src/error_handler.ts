import { ErrorRequestHandler } from "express";
import { ClientError } from "./client_error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
};
