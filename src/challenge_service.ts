import { PrismaClient } from "@prisma/client";

export const challengeServiceFactory = (prismaClient: PrismaClient) => {
  return {
    getChallenges: async () => {
      return prismaClient.challengeRow.findMany();
    },
    getChallenge: async (id: string) => {
      if (typeof id !== "string") {
        throw new Error();
      }

      const challenge = await prismaClient.challengeRow.findUnique({
        where: { id },
      });

      if (!challenge) throw new Error();

      return challenge;
    },
    createChallenge: async () => {},
    deleteChallenge: async () => {},
  };
};
