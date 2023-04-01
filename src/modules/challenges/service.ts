import { Db } from "./types";
import { createFactory } from "./create";
import { getAllFactory } from "./get_all";
import { getFactory } from "./get";
import { deleteFactory } from "./delete";

export const serviceFactory = (db: Db) => {
  return {
    getAll: getAllFactory(db),
    get: getFactory(db),
    create: createFactory(db),
    delete: deleteFactory(db),
  };
};
