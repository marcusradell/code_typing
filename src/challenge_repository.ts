import { ChallengeRow } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  getById: (id: string) => Promise<ChallengeRow | null>;
  create: (data: {
    id: string;
    name: string;
    content: string;
    level: number;
  }) => Promise<void>;
  delete: (id: string) => Promise<void>;
};
