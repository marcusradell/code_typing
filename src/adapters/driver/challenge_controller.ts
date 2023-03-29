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

    try {
      const challenge = await challengeService.display(id);

      res.json(challenge);
    } catch (error) {
      return res.sendStatus(400);
    }
  });

  app.post("/api/challenges", async (req, res) => {
    const { name, content } = req.body;

    await challengeService.add({ name, content });

    res.sendStatus(200);
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await challengeService.remove(id);

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(400);
    }
  });
};
