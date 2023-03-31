import { Router } from "express";
import { ChallengesService } from ".";
import { v4 } from "uuid";

export const routerFactory = (service: ChallengesService) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const data = await service.getAll();
    res.json(data);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await service.get({ id });
    res.json(data);
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

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") return res.sendStatus(400);

    await service.delete(id);
    res.sendStatus(200);
  });

  return router;
};
