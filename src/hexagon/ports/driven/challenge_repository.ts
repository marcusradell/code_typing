import { Challenge } from "../../internal/challenge";

export type ChallengeRepository = {
  getAll: () => Promise<Challenge[]>;
  getById: (id: string) => Promise<Challenge | null>;
  create: (data: {
    id: string;
    name: string;
    content: string;
    level: number;
  }) => Promise<void>;
  delete: (id: string) => Promise<void>;
};
