import { ChallengeRow, PrismaClient } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  getById: (id: string) => Promise<ChallengeRow | null>;
  // create: async () => {},
  // delete: async () => {},
};

export const challengeRepositoryFactory = (
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
    // create: async () => {},
    // delete: async () => {},
  };
};
