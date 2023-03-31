import { routerFactory } from "./router";
import { serviceFactory } from "./service";
import { Db } from "./types";

export { ChallengesService, Challenge } from "./types";

export const challengesModuleFactory = (db: Db) => {
  const service = serviceFactory(db);

  return {
    service,
    routerFactory: () => routerFactory(service),
  };
};
