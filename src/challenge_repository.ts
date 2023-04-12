import { PrismaClient } from "@prisma/client";

export const challengeRepositoryFactory = (prismaClient: PrismaClient) => {
  return {
    getAll: async () => {},
    getById: async () => {},
    create: async () => {},
    delete: async () => {},
  };
};
