import { PrismaClient } from "@prisma/client";

export const challengeServiceFactory = (prismaClient: PrismaClient) => {
  return {
    getChallenges: async () => {
      return prismaClient.challengeRow.findMany();
    },
    getChallenge: async () => {},
    createChallenge: async () => {},
    deleteChallenge: async () => {},
  };
};
