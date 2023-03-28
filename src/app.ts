import { PrismaClient } from "@prisma/client";
import express, { ErrorRequestHandler } from "express";
import { IdentityGeneratorProvider } from "./adapters/driven/identity_generator_provider";
import { PrismaChallengeRepository } from "./adapters/driven/prisma_challenge_repository";
import { SystemTimeProvider } from "./adapters/driven/system_time_provider";
import { ChallengeController } from "./adapters/driver/challenge_controller";
import { ChallengeServiceImpl } from "./core/impl/challenge_service_impl";
import { ValidationError } from "./validation_error";

export const App = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.get("/", (req, res) => {
    res.sendStatus(200);
  });

  const challengeRepository = PrismaChallengeRepository(prismaClient);
  const timeProvider = SystemTimeProvider();
  const identityGenerator = IdentityGeneratorProvider();

  const challengeService = ChallengeServiceImpl(
    challengeRepository,
    prismaClient,
    timeProvider,
    identityGenerator
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

  return app;
};
