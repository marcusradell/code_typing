import { ClientError } from "../../client_error";
import { Db } from "./types";

export const serviceFactory = (db: Db) => {
  return {
    getAll: async () => await db.challengeRow.findMany(),
    get: async (args: { id: unknown }) => {
      if (typeof args.id !== "string") throw new ClientError();

      const row = db.challengeRow.findUnique({
        where: { id: args.id },
      });

      if (!row) throw new ClientError();

      return row;
    },
    create: async (args: {
      name: unknown;
      content: unknown;
      id: string;
      today: Date;
    }) => {
      const { name, content, id, today } = args;

      if (typeof name !== "string" || typeof content !== "string")
        throw new ClientError();

      const MONDAY = 1;
      let level = 1;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }
      return await db.challengeRow.create({
        data: { name, content, id, level },
      });
    },
    delete: async (id: string) =>
      await db.challengeRow.delete({ where: { id } }),
  };
};
