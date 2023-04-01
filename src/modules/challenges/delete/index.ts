import { ValidationError } from "../../../client_error";
import { Db } from "../types";

export const deleteFactory = (db: Db) => async (input: { id: unknown }) => {
  const { id } = input;

  if (typeof id !== "string") throw new ValidationError();

  await db.challengeRow.delete({ where: { id } });
};
