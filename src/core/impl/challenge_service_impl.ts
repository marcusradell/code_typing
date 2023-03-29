import { PrismaClient } from "@prisma/client";
import { ValidationError } from "../../validation_error";
import { ChallengeRepository } from "../ports/driven/challenge_repository";
import { IdentityGenerator } from "../ports/driven/identity_generator";
import { TimeProvider } from "../ports/driven/time_provider";
import { ChallengeService } from "../ports/driver/challenge_service";

export const ChallengeServiceImpl = (
  challengeRepository: ChallengeRepository,
  // TODO: remove completely.
  prismaClient: PrismaClient,
  timeProvider: TimeProvider,
  identityGenerator: IdentityGenerator
): ChallengeService => {
  return {
    list: async () => {
      return await prismaClient.challengeRow.findMany();
    },
    display: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      const challenge = await prismaClient.challengeRow.findUnique({
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

      const data = { id: identityGenerator.v4(), name, content, level };

      await challengeRepository.add(data);
    },
    remove: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      await prismaClient.challengeRow.delete({ where: { id } });
    },
  };
};
