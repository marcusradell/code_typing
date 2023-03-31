import { v4 } from "uuid";
import { ClientError } from "../../../client_error";
import { Db } from "../types";
import { state } from "./state";

export const createFactory =
  (db: Db) => async (args: { name: unknown; content: unknown }) => {
    const { name, content } = args;

    if (typeof name !== "string" || typeof content !== "string")
      throw new ClientError();

    const id = v4();
    const today = new Date();

    const data = state(name, content, today, id);

    try {
      await db.challengeRow.create({
        data,
      });
    } catch (error) {
      throw new ClientError();
    }

    return { id };
  };
