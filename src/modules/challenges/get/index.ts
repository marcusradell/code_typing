import { Db } from "../types";
import { Input, inputSchema } from "./input";
import { logic } from "./logic";

export const getFactory = (db: Db) => async (rawInput: Input) => {
  const { id } = inputSchema.parse(rawInput);

  const row = await db.challengeRow.findUnique({
    where: { id },
  });

  return logic(row);
};
