import { PrismaClient } from "@prisma/client";

type Db = PrismaClient;

export const challengesModuleFactory = (db: Db) => {
  const service = {
    getAll: async () => await db.challengeRow.findMany(),
  };

  return {
    service,
  };
};
