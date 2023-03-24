import { App } from "./app";

import { PrismaClient } from "@prisma/client";
import express from "express";
import { createChallengeController } from "./challange_controller";
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

createChallengeController(app, prismaClient);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
