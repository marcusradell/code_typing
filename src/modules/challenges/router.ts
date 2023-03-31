import { Router } from "express";
import { ChallengesService } from ".";

export const routerFactory = (service: ChallengesService) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const result = await service.getAll();
    res.json(result);
  });

  router.get("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.sendStatus(400);
    }

    const challenge = await service.get(id);

    if (!challenge) return res.sendStatus(400);

    res.json(challenge);
  });

  return router;
};
