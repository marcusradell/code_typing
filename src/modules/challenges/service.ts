import { Db } from "./types";

export const serviceFactory = (db: Db) => {
  return {
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
};
