import { v4 } from "uuid";
import { ValidationError } from "../../../client_error";
import { Db } from "../types";
import { logic } from "./logic";
import { Input, inputSchema } from "./input";

export const createFactory = (db: Db) => async (rawInput: Input) => {
  const { name, content } = inputSchema.parse(rawInput);

  const id = v4();
  const todayWeekday = new Date().getDay();

  const data = logic({ id, name, content, todayWeekday });

  try {
    await db.challengeRow.create({
      data,
    });
  } catch (error) {
    throw new ValidationError();
  }

  return { id };
};
