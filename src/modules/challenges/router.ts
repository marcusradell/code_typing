import { Router } from "express";
import { ChallengesService } from ".";
import { v4 } from "uuid";

export const routerFactory = (service: ChallengesService) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const result = await service.getAll();
    res.json(result);
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.sendStatus(400);
    }

    const challenge = await service.get(id);

    if (!challenge) return res.sendStatus(400);

    res.json(challenge);
  });

  router.post("/", async (req, res) => {
    try {
      const { name, content } = req.body;

      if (typeof name !== "string" || typeof content !== "string") {
        return res.sendStatus(400);
      }

      const today = new Date();
      const MONDAY = 1;
      let level = 1;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }

      const id = v4();

      await service.create({ id, name, content, level });

      res.json({ id });
    } catch (error) {
      return res.sendStatus(400);
    }
  });

  return router;
};
