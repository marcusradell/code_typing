import { ChallengeRow, PrismaClient } from "@prisma/client";
import { challengesModuleFactory } from ".";

export type Db = Pick<PrismaClient, "challengeRow">;

export type Challenge = ChallengeRow;

export type ChallengesService = ReturnType<
  typeof challengesModuleFactory
>["service"];
