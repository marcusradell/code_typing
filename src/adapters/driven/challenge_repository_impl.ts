import { ChallengeRow, PrismaClient } from "@prisma/client";
import { ChallengeRepository } from "../../hexagon/ports/driven/challenge_repository";

export const challengeRepositoryImplFactory = (
  prismaClient: PrismaClient
): ChallengeRepository => {
  return {
    getAll: async () => {
      return await prismaClient.challengeRow.findMany();
    },
    getById: async (id: string) => {
      return await prismaClient.challengeRow.findUnique({
        where: { id },
      });
    },
    create: async (data) => {
      await prismaClient.challengeRow.create({
        data,
      });
    },
    delete: async (id) => {
      await prismaClient.challengeRow.delete({ where: { id } });
    },
  };
};
