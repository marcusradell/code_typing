import { Router } from "express";
import { ChallengesService } from ".";

export const routerFactory = (service: ChallengesService) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const result = await service.getAll();
    res.json(result);
  });

  return router;
};
