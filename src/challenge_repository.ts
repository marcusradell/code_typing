import { ChallengeRow, PrismaClient } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  // getById: async () => {},
  // create: async () => {},
  // delete: async () => {},
};

export const challengeRepositoryFactory = (prismaClient: PrismaClient) => {
  return {
    getAll: async () => {
      return prismaClient.challengeRow.findMany();
    },
    // getById: async () => {},
    // create: async () => {},
    // delete: async () => {},
  };
};
