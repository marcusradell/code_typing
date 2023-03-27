import { PrismaClient } from "@prisma/client";
import { ChallengeRepository } from "./challenge_repository";

export const PrismaChallengeRepository = (
  prismaClient: PrismaClient
): ChallengeRepository => {
  return {
    // We should have add, remove, getById, getAll
    add: async (data) => {
      await prismaClient.challangeRow.create({
        data,
      });
    },
  };
};
