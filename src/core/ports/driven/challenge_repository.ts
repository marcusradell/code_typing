import { Challenge } from "../driver/challenge_service";

export interface ChallengeRepository {
  add: (data: {
    id: string;
    name: string;
    content: string;
    level: number;
  }) => Promise<void>;
  getAll: () => Promise<Challenge[]>;
  getById: (id: string) => Promise<Challenge | null>;
  remove: (id: string) => Promise<void>;
}
