import { ValidationError } from "../../validation_error";
import { v4 } from "uuid";
import { ChallengeService } from "../ports/driver/challenge_service";
import { ChallengeRepository } from "../ports/driven/challenge_repository";
import { TimeProvider } from "../ports/driven/time_provider";

export const challengeServiceImplFactory = (
  challengeRepository: ChallengeRepository,
  timeProvider: TimeProvider
): ChallengeService => {
  return {
    getChallenges: async () => {
      return await challengeRepository.getAll();
    },
    getChallenge: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      const challenge = await challengeRepository.getById(id);

      if (!challenge) throw new ValidationError();

      return challenge;
    },
    createChallenge: async (name, content) => {
      if (typeof name !== "string" || typeof content !== "string") {
        throw new ValidationError();
      }

      const today = timeProvider.getTime();
      const MONDAY = 1;
      let level = 1;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }

      const id = v4();

      await challengeRepository.create({ id, name, content, level });

      return id;
    },
    deleteChallenge: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      await challengeRepository.delete(id);
    },
  };
};
