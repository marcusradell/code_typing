import path from "path";
import { PrismaClient } from "@prisma/client";
import express, { ErrorRequestHandler } from "express";
import { IdentityGeneratorProvider } from "./adapters/driven/identity_generator_provider";
import { PrismaChallengeRepository } from "./adapters/driven/prisma_challenge_repository";
import { SystemTimeProvider } from "./adapters/driven/system_time_provider";
import { challengeControllerFactory } from "./adapters/driver/challenge_controller";
import { ChallengeServiceImpl } from "./core/impl/challenge_service_impl";
import { ValidationError } from "./validation_error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
};

export const App = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/", (req, res) => {
    res.sendFile("postman.json", { root: path.resolve(__dirname, "../") });
  });

  const challengeRepository = PrismaChallengeRepository(prismaClient);
  const timeProvider = SystemTimeProvider();
  const identityGenerator = IdentityGeneratorProvider();

  const challengeService = ChallengeServiceImpl(
    challengeRepository,
    timeProvider,
    identityGenerator
  );

  challengeControllerFactory(app, challengeService);

  app.use(errorHandler);

  return app;
};
