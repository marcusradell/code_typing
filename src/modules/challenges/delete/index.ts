import { Db } from "../types";
import { Input, inputSchema } from "./input";

export const deleteFactory = (db: Db) => async (rawInput: Input) => {
  const { id } = inputSchema.parse(rawInput);
  await db.challengeRow.delete({ where: { id } });
};
