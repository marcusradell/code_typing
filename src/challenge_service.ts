import { ChallangeRow, PrismaClient } from "@prisma/client";

export const ChallengeService = (
  prismaClient: PrismaClient
): ChallengeService => {
  return {
    list: async () => {
      return await prismaClient.challangeRow.findMany();
    },
    display: async (id) => {
      const challenge = await prismaClient.challangeRow.findUnique({
        where: { id },
      });

      return challenge;
    },
  };
};

type List = () => Promise<ChallangeRow[]>;

type Display = (id: string) => Promise<ChallangeRow | null>;

export type ChallengeService = {
  list: List;
  display: Display;
};
