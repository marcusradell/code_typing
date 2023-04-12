import { ChallengeRow, PrismaClient } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  getById: (id: string) => Promise<ChallengeRow | null>;
  create: (data: {
    id: string;
    name: string;
    content: string;
    level: number;
  }) => Promise<void>;
  delete: (id: string) => Promise<void>;
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
