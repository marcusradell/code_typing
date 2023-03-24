import { App } from "./app";

import { PrismaClient } from "@prisma/client";
import express from "express";
import { ChallengeController } from "./challange_controller";
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

const challengeService = ChallengeService(prismaClient);

ChallengeController(app, prismaClient, challengeService);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
