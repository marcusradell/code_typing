import { ChallangeRow, PrismaClient } from "@prisma/client";

export const ChallengeService = (
  prismaClient: PrismaClient
): ChallengeService => {
  return {
    list: async () => {
      return await prismaClient.challangeRow.findMany();
    },
  };
};

type List = () => Promise<ChallangeRow[]>;

export type ChallengeService = {
  list: List;
};
