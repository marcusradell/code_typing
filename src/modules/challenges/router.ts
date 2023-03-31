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
    const { name, content } = req.body;

    const id = v4();
    const today = new Date();

    await service.create({ id, name, content, today });

    res.json({ id });
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const data = await service.delete({ id });
    res.json(data);
  });

  return router;
};
