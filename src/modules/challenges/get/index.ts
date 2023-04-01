import { ValidationError } from "../../../client_error";
import { Db } from "../types";

export const getFactory = (db: Db) => async (input: { id: unknown }) => {
  const { id } = input;

  if (typeof id !== "string") throw new ValidationError();

  const row = db.challengeRow.findUnique({
    where: { id },
  });

  if (!row) throw new ValidationError();

  return row;
};
