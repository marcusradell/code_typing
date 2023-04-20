import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

export const serviceFactory = (prismaClient: PrismaClient) => {
  return {
    getAll: async () => await prismaClient.challengeRow.findMany(),
    create: async (input: { name: string; content: string }) => {
      const { name, content } = input;

      if (typeof name !== "string" || typeof content !== "string") {
        throw new Error("Invalid");
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

      return { id };
    },
  };
};
