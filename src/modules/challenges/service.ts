import { ClientError } from "../../client_error";
import { Db } from "./types";

export const serviceFactory = (db: Db) => {
  return {
    getAll: async () => await db.challengeRow.findMany(),
    get: async (args: { id: string }) => {
      if (typeof args.id !== "string") throw new ClientError();

      const row = db.challengeRow.findUnique({
        where: { id: args.id },
      });

      if (!row) throw new ClientError();

      return row;
    },
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
