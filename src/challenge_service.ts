import { ChallangeRow, PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { ChallengeRepository } from "./challenge_repository";
import { ValidationError } from "./validation_error";

export const ChallengeService = (
  challengeRepository: ChallengeRepository,
  // TODO: remove completely.
  prismaClient: PrismaClient
): ChallengeService => {
  return {
    list: async () => {
      return await prismaClient.challangeRow.findMany();
    },
    display: async (id) => {
      if (!id || typeof id !== "string") {
        throw new ValidationError();
      }

      const challenge = await prismaClient.challangeRow.findUnique({
        where: { id },
      });

      if (!challenge) {
        throw new ValidationError();
      }

      return challenge;
    },
    add: async (name) => {
      const content = "abc;";
      let level = 1;
      const today = new Date();
      const MONDAY = 0;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }

      const data = { id: v4(), name, content, level };

      await challengeRepository.add(data);
    },
    remove: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      await prismaClient.challangeRow.delete({ where: { id } });
    },
  };
};

type List = () => Promise<ChallangeRow[]>;

type Display = (id: unknown) => Promise<ChallangeRow | null>;

type Add = (name: string) => Promise<void>;

type Remove = (id: unknown) => Promise<void>;

export type ChallengeService = {
  list: List;
  display: Display;
  add: Add;
  remove: Remove;
};
