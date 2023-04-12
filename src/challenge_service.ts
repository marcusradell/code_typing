import { PrismaClient } from "@prisma/client";
import { ValidationError } from "./validation_error";
import { v4 } from "uuid";
import { ChallengeRepository } from "./challenge_repository";

export const challengeServiceFactory = (
  prismaClient: PrismaClient,
  challengeRepository: ChallengeRepository
) => {
  return {
    getChallenges: async () => {
      return await challengeRepository.getAll();
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
    createChallenge: async (name: string, content: string) => {
      if (typeof name !== "string" || typeof content !== "string") {
        throw new ValidationError();
      }

      const today = new Date();
      const MONDAY = 1;
      let level = 1;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }

      const id = v4();

      await prismaClient.challengeRow.create({
        data: { id, name, content, level },
      });

      return id;
    },
    deleteChallenge: async (id: string) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      return await prismaClient.challengeRow.delete({ where: { id } });
    },
  };
};
