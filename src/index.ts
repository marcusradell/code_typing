import { App } from "./app";

import { PrismaClient } from "@prisma/client";
import express, { ErrorRequestHandler } from "express";
import { ChallengeController } from "./challenge_controller";
import { ChallengeRepository } from "./challenge_repository";
import { ChallengeService } from "./challenge_service";
import { ValidationError } from "./validation_error";
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

const challengeRepository = ChallengeRepository(prismaClient);
const challengeService = ChallengeService(challengeRepository, prismaClient);

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
