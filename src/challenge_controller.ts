import { Express } from "express";
import { v4 } from "uuid";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { challengeServiceFactory } from "./challenge_service";
import { ValidationError } from "./validation_error";

export const challengeControllerFactory = (
  app: Express,
  prismaClient: PrismaClient
) => {
  const challengeService = challengeServiceFactory(prismaClient);

  app.get("/", (req, res) => {
    res.sendFile("postman.json", { root: path.resolve(__dirname, "../") });
  });

  app.get("/api/challenges", async (req, res) => {
    res.json(await challengeService.getChallenges());
  });

  app.get("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const challenge = await challengeService.getChallenge(id);
      res.json(challenge);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.sendStatus(400);
      }
      res.sendStatus(500);
    }
  });

  app.post("/api/challenges", async (req, res) => {
    try {
      const { name, content } = req.body;
      const id = await challengeService.createChallenge(name, content);
      res.json({ id });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.sendStatus(400);
      }
      res.sendStatus(500);
    }
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") return res.sendStatus(400);

    await prismaClient.challengeRow.delete({ where: { id } });
    res.sendStatus(200);
  });
};
