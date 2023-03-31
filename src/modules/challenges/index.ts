import { PrismaClient } from "@prisma/client";
import { routerFactory } from "./router";

type Db = PrismaClient;

export type ChallengesService = ReturnType<
  typeof challengesModuleFactory
>["service"];

export const challengesModuleFactory = (db: Db) => {
  const service = {
    getAll: async () => await db.challengeRow.findMany(),
  };

  return {
    service,
    routerFactory: () => routerFactory(service),
  };
};
