import { v4 } from "uuid";
import { ClientError } from "../../../client_error";
import { Db } from "../types";
import { logic } from "./logic";

export const createFactory =
  (db: Db) => async (input: { name: unknown; content: unknown }) => {
    const { name, content } = input;

    if (typeof name !== "string" || typeof content !== "string")
      throw new ClientError();

    const id = v4();
    const todayWeekday = new Date().getDay();

    const data = logic({ id, name, content, todayWeekday });

    try {
      await db.challengeRow.create({
        data,
      });
    } catch (error) {
      throw new ClientError();
    }

    return { id };
  };
