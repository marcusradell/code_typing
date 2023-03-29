export type Challenge = {
  id: string;
  name: string;
  content: string;
  level: number;
};

export interface ChallengeService {
  list: List;
  display: Display;
  add: Add;
  remove: Remove;
}

type List = () => Promise<Challenge[]>;

type Display = (id: unknown) => Promise<Challenge | null>;

type Add = (args: { name: unknown; content: unknown }) => Promise<void>;

type Remove = (id: unknown) => Promise<void>;
