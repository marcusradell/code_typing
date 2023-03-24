import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { ChallengeService } from "./challenge_service";

export const ChallengeController = (
  app: Express,
  prismaClient: PrismaClient,
  challengeService: ChallengeService
) => {
  app.get("/challenge/list", async (req, res) => {
    res.json(await challengeService.list());
  });

  app.get("/challenge/display", async (req, res) => {
    const id = req.query.id;

    if (!id || typeof id !== "string") return res.sendStatus(400);

    const challenge = await challengeService.display(id);

    if (!challenge) return res.sendStatus(400);

    res.json(challenge);
  });

  app.post("/challenge/add", async (req, res) => {
    const { name } = req.body;

    await challengeService.add(name);

    res.sendStatus(200);
  });

  app.post("/challenge/remove", async (req, res) => {
    const { id } = req.body;

    if (!id) return res.sendStatus(400);

    await prismaClient.challangeRow.delete({ where: id });
    res.sendStatus(200);
  });
};
