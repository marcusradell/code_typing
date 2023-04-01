import { ClientError } from "../../../client_error";
import { Db } from "../types";

export const deleteFactory = (db: Db) => async (input: { id: unknown }) => {
  const { id } = input;

  if (typeof id !== "string") throw new ClientError();

  await db.challengeRow.delete({ where: { id } });
};
