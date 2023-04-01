import { Express } from "express";
import { ChallengeService } from "../../core/ports/driver/challenge_service";

export const challengeControllerFactory = (
  app: Express,
  challengeService: ChallengeService
) => {
  app.get("/api/challenges", async (req, res) => {
    const challenges = await challengeService.list();
    res.json(challenges);
  });

  app.get("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;
    const challenge = await challengeService.display(id);
    res.json(challenge);
  });

  app.post("/api/challenges", async (req, res) => {
    const { name, content } = req.body;
    const createdData = await challengeService.add({ name, content });
    res.json(createdData);
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const { id } = req.params;
    await challengeService.remove(id);
    res.json();
  });
};
