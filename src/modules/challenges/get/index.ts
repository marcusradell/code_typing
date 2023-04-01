import { ClientError } from "../../../client_error";
import { Db } from "../types";

export const getFactory = (db: Db) => async (args: { id: unknown }) => {
  if (typeof args.id !== "string") throw new ClientError();

  const row = db.challengeRow.findUnique({
    where: { id: args.id },
  });

  if (!row) throw new ClientError();

  return row;
};
