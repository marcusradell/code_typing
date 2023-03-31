export type Challenge = {
  id: string;
  name: string;
  content: string;
  level: number;
};

export interface ChallengeService {
  list: () => Promise<Challenge[]>;
  display: (id: unknown) => Promise<Challenge | null>;
  add: (args: { name: unknown; content: unknown }) => Promise<{ id: string }>;
  remove: (id: unknown) => Promise<void>;
}
