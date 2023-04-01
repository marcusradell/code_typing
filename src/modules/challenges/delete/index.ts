import { ClientError } from "../../../client_error";
import { Db } from "../types";

export const deleteFactory = (db: Db) => async (args: { id: string }) => {
  const { id } = args;

  if (typeof id !== "string") throw new ClientError();

  await db.challengeRow.delete({ where: { id } });
};
