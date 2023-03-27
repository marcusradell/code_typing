import { ChallangeRow, PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { ChallengeRepository } from "./challenge_repository";
import { ChallengeService } from "./challenge_service";
import { TimeProvider } from "./time_provider";
import { ValidationError } from "./validation_error";

export const ChallengeServiceImpl = (
  challengeRepository: ChallengeRepository,
  // TODO: remove completely.
  prismaClient: PrismaClient,
  timeProvider: TimeProvider
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
      const today = timeProvider.now();
      const MONDAY = 1;

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
