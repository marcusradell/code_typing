import { PrismaClient } from "@prisma/client";
import { ChallengeRepository } from "../../core/ports/driven/challenge_repository";

export const prismaChallengeRepositoryFactory = (
  prismaClient: PrismaClient
): ChallengeRepository => {
  return {
    add: async (data) => {
      await prismaClient.challengeRow.create({
        data,
      });
    },
    getAll: async () => {
      return await prismaClient.challengeRow.findMany();
    },
    getById: async (id) => {
      return await prismaClient.challengeRow.findUnique({
        where: { id },
      });
    },
    remove: async (id) => {
      await prismaClient.challengeRow.delete({ where: { id } });
    },
  };
};
