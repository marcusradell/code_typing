import { App } from "./app";

import { PrismaClient } from "@prisma/client";
import express from "express";
import { ChallengeController } from "./challenge_controller";
import { ChallengeRepository } from "./challenge_repository";
import { ChallengeService } from "./challenge_service";
const app = express();
const port = 3000;

const main = () => {
  App().listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
const prismaClient = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const challengeRepository = ChallengeRepository(prismaClient);
const challengeService = ChallengeService(challengeRepository, prismaClient);

ChallengeController(app, challengeService);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
