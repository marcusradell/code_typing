import { PrismaClient } from "@prisma/client";
import { challengesModuleFactory } from "./modules";

export const sandbox = async () => {
  const prismaClient = new PrismaClient();
  const { service } = challengesModuleFactory(prismaClient);

  const oldChallenges = await service.getAll();

  await Promise.all(
    oldChallenges.map((oldChallenge) => service.delete({ id: oldChallenge.id }))
  );

  for (let i = 0; i < 5; i++) {
    await service.create({
      name: `Challenge: ${i}`,
      content: `Content; ${Array(Math.round(Math.random() * 200))
        .fill(".")
        .join("")}`,
    });
  }

  const challenges = await service.getAll();

  console.log({ challenges });
};
