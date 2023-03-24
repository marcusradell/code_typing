import { PrismaClient } from "@prisma/client";

export default async () => {
  const prismaClient = new PrismaClient();

  const deletes = Object.keys(prismaClient)
    .filter((key) => !key.startsWith("_") && !key.startsWith("$"))
    .map((key) => (prismaClient as any)[key].deleteMany());

  await Promise.all(deletes);
};
