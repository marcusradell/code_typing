import { ChallangeRow, PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

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
    add: async (name) => {
      await prismaClient.challangeRow.create({ data: { id: v4(), name } });
    },
    remove: async (id) => {
      await prismaClient.challangeRow.delete({ where: { id } });
    },
  };
};

type List = () => Promise<ChallangeRow[]>;

type Display = (id: string) => Promise<ChallangeRow | null>;

type Add = (name: string) => Promise<void>;

type Remove = (id: string) => Promise<void>;

export type ChallengeService = {
  list: List;
  display: Display;
  add: Add;
  remove: Remove;
};
