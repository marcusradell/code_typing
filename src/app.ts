import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import { challengesFactory } from "./modules";

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

  const challenges = challengesFactory(prismaClient);

  app.use("/api/challenges", challenges.routerFactory());

  return app;
};
