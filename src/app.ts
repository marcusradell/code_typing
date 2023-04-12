import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeControllerFactory } from "./adapters/driver/challenge_controller";
import { challengeRepositoryImplFactory } from "./adapters/driven/challenge_repository_impl";
import { challengeServiceImplFactory } from "./hexagon/internal/challenge_service_impl";
import { systemTimeProviderFactory } from "./adapters/driven/system_time_provider";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const challengeRepository = challengeRepositoryImplFactory(prismaClient);

  const timeProvider = systemTimeProviderFactory();

  const challengeService = challengeServiceImplFactory(
    challengeRepository,
    timeProvider
  );

  challengeControllerFactory(app, challengeService);

  return app;
};
