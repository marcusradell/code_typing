import path from "path";
import { PrismaClient } from "@prisma/client";
import express, { ErrorRequestHandler } from "express";
import { identityGeneratorProviderFactory } from "./adapters/driven/identity_generator_provider";
import { prismaChallengeRepositoryFactory } from "./adapters/driven/prisma_challenge_repository";
import { systemTimeProviderFactory } from "./adapters/driven/system_time_provider";
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

  const challengeRepository = prismaChallengeRepositoryFactory(prismaClient);
  const timeProvider = systemTimeProviderFactory();
  const identityGenerator = identityGeneratorProviderFactory();

  const challengeService = ChallengeServiceImpl(
    challengeRepository,
    timeProvider,
    identityGenerator
  );

  challengeControllerFactory(app, challengeService);

  app.use(errorHandler);

  return app;
};
