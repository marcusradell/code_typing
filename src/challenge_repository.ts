import { PrismaClient } from "@prisma/client";

export const ChallengeRepository = (
  prismaClient: PrismaClient
): ChallengeRepository => {
  return {
    // We should have add, remove, getById, getAll
    add: async (data) => {
      await prismaClient.challangeRow.create({
        data,
      });
    },
  };
};

type Add = (data: {
  id: string;
  name: string;
  content: string;
  level: number;
}) => Promise<void>;

export type ChallengeRepository = { add: Add };
