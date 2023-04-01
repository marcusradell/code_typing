import { PrismaClient } from "@prisma/client";
import express from "express";
import { v4 } from "uuid";
import path from "path";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/", (req, res) => {
    res.sendFile("postman.json", { root: path.resolve(__dirname, "../") });
  });

  app.get("/api/challenges", async (req, res) => {
    res.json(await prismaClient.challengeRow.findMany());
  });

  app.get("/api/challenges/:id", async (req, res) => {
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

  app.post("/api/challenges", async (req, res) => {
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

      await prismaClient.challengeRow.create({
        data: { id, name, content, level },
      });

      res.json({ id });
    } catch (error) {
      return res.sendStatus(400);
    }
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") return res.sendStatus(400);

    await prismaClient.challengeRow.delete({ where: { id } });
    res.sendStatus(200);
  });

  return app;
};
