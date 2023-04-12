import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeControllerFactory } from "./challenge_controller";
import { challengeRepositoryImplFactory } from "./challenge_repository_impl";
import { challengeServiceImplFactory } from "./challenge_service_impl";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const challengeRepository = challengeRepositoryImplFactory(prismaClient);

  const challengeService = challengeServiceImplFactory(challengeRepository);

  challengeControllerFactory(app, challengeService);

  return app;
};
