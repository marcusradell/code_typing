import { Db } from "../types";

export const getAllFactory = (db: Db) => async () => db.challengeRow.findMany();
