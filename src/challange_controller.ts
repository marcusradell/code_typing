import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { v4 } from "uuid";

export const createChallengeController = (
  app: Express,
  prismaClient: PrismaClient
) => {
  app.get("/challenge/list", async (req, res) => {
    res.json(await prismaClient.challangeRow.findMany());
  });

  app.get("/challenge/display", async (req, res) => {
    const id = req.query.id;

    if (!id || typeof id !== "string") return res.sendStatus(400);

    const challenge = await prismaClient.challangeRow.findUnique({
      where: { id },
    });

    if (!challenge) return res.sendStatus(400);

    res.json(challenge);
  });

  app.post("/challenge/add", async (req, res) => {
    const { name } = req.body;
    await prismaClient.challangeRow.create({ data: { id: v4(), name } });
    res.sendStatus(200);
  });

  app.post("/challenge/remove", async (req, res) => {
    const { id } = req.body;

    if (!id) return res.sendStatus(400);

    await prismaClient.challangeRow.delete({ where: id });
    res.sendStatus(200);
  });
};
