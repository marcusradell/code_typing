import { PrismaClient } from "@prisma/client";
import { ValidationError } from "./validation_error";

export const challengeServiceFactory = (prismaClient: PrismaClient) => {
  return {
    getChallenges: async () => {
      return prismaClient.challengeRow.findMany();
    },
    getChallenge: async (id: string) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      const challenge = await prismaClient.challengeRow.findUnique({
        where: { id },
      });

      if (!challenge) throw new ValidationError();

      return challenge;
    },
    createChallenge: async () => {},
    deleteChallenge: async () => {},
  };
};
