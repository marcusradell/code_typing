import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { serviceFactory } from "./service";

export const challengesFactory = (prismaClient: PrismaClient) => {
  const service = serviceFactory(prismaClient);

  return {
    service,
    routerFactory: () => {
      const router = Router();

      router.get("/", async (req, res) => {
        res.json(await service.getAll());
      });

      router.get("/:id", async (req, res) => {
        const id = req.params.id;

        if (typeof id !== "string") {
          return res.sendStatus(400);
        }

        const challenge = await prismaClient.challengeRow.findUnique({
          where: { id },
        });

        if (!challenge) return res.sendStatus(400);

        res.json(challenge);
      });

      router.post("/", async (req, res) => {
        try {
          res.json(service.create(req.body));
        } catch (error) {
          return res.sendStatus(400);
        }
      });

      router.delete("/:id", async (req, res) => {
        const id = req.params.id;

        if (typeof id !== "string") return res.sendStatus(400);

        await prismaClient.challengeRow.delete({ where: { id } });
        res.sendStatus(200);
      });

      return router;
    },
  };
};
