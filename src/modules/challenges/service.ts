import { ClientError } from "../../client_error";
import { Db } from "./types";
import { createFactory } from "./create";
import { getAllFactory } from "./get_all";

export const serviceFactory = (db: Db) => {
  return {
    getAll: getAllFactory(db),
    get: async (args: { id: unknown }) => {
      if (typeof args.id !== "string") throw new ClientError();

      const row = db.challengeRow.findUnique({
        where: { id: args.id },
      });

      if (!row) throw new ClientError();

      return row;
    },
    create: createFactory(db),
    delete: async (args: { id: string }) => {
      const { id } = args;

      if (typeof id !== "string") throw new ClientError();

      await db.challengeRow.delete({ where: { id } });
    },
  };
};
