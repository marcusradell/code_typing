import { ClientError } from "../../../client_error";
import { Db } from "../types";

export const getFactory = (db: Db) => async (input: { id: unknown }) => {
  const { id } = input;

  if (typeof id !== "string") throw new ClientError();

  const row = db.challengeRow.findUnique({
    where: { id },
  });

  if (!row) throw new ClientError();

  return row;
};
