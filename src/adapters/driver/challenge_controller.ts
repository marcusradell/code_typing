import { Express } from "express";
import path from "path";
import { ValidationError } from "../../validation_error";
import { ChallengeService } from "../../hexagon/ports/driver/challenge_service";

export const challengeControllerFactory = (
  app: Express,
  challengeService: ChallengeService
) => {
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

    try {
      await challengeService.deleteChallenge(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.sendStatus(400);
      } else {
        res.sendStatus(500);
      }
    }

    res.sendStatus(200);
  });
};
