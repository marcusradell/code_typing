import { PrismaClient } from "@prisma/client";
import { Router } from "express";

type Db = PrismaClient;

type ChallengesService = ReturnType<typeof challengesModuleFactory>["service"];

const routerFactory = (service: ChallengesService) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const result = await service.getAll();
    res.json(result);
  });

  return router;
};

export const challengesModuleFactory = (db: Db) => {
  const service = {
    getAll: async () => await db.challengeRow.findMany(),
  };

  return {
    service,
    routerFactory: () => routerFactory(service),
  };
};
