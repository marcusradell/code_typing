import { App } from "./app";

import { PrismaClient } from "@prisma/client";
import express, { ErrorRequestHandler } from "express";
import { ChallengeController } from "./challenge_controller";
import { PrismaChallengeRepository } from "./prisma_challenge_repository";
import { ChallengeServiceImpl } from "./challenge_service";
import { ValidationError } from "./validation_error";
import { SystemTimeProvider } from "./system_time_provider";
const app = express();
const port = 3000;

const main = () => {
  App().listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
const prismaClient = new PrismaClient();

app.get("/", (req, res) => {
  res.sendStatus(200);
});

const challengeRepository = PrismaChallengeRepository(prismaClient);
const timeProvider = SystemTimeProvider();
const challengeService = ChallengeServiceImpl(
  challengeRepository,
  prismaClient,
  timeProvider
);

ChallengeController(app, challengeService);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
