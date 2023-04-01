import { ValidationError } from "../../../client_error";
import { Db } from "../types";
import { Input, inputSchema } from "./input";

export const getFactory = (db: Db) => async (rawInput: Input) => {
  const { id } = inputSchema.parse(rawInput);

  const row = db.challengeRow.findUnique({
    where: { id },
  });

  if (!row) throw new ValidationError();

  return row;
};
