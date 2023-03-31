import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import { challengesModuleFactory } from "./modules";

export const App = () => {
  const app = express();

  app.use(express.json());

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/", (req, res) => {
    res.sendFile("postman.json", { root: path.resolve(__dirname, "../") });
  });

  const prismaClient = new PrismaClient();

  const challengesModule = challengesModuleFactory(prismaClient);

  app.use("/api/challenges", challengesModule.routerFactory());

  return app;
};
