import { ChallengeRow } from "@prisma/client";
import { routerFactory } from "./router";
import { Db } from "./types";

export { ChallengesService, Challenge } from "./types";

export const challengesModuleFactory = (db: Db) => {
  const service = {
    getAll: async () => await db.challengeRow.findMany(),
    get: async (id: string) =>
      db.challengeRow.findUnique({
        where: { id },
      }),
    create: async (data: {
      id: string;
      name: string;
      content: string;
      level: number;
    }) => await db.challengeRow.create({ data }),
    delete: async (id: string) =>
      await db.challengeRow.delete({ where: { id } }),
  };

  return {
    service,
    routerFactory: () => routerFactory(service),
  };
};
