import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeControllerFactory } from "./challenge_controller";
import { challengeRepositoryFactory } from "./challenge_repository";
import { challengeServiceFactory } from "./challenge_service";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const challengeRepository = challengeRepositoryFactory(prismaClient);

  const challengeService = challengeServiceFactory(challengeRepository);

  challengeControllerFactory(app, challengeService);

  return app;
};
